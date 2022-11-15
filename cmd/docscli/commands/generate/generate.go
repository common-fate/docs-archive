package generate

import (
	"os"
	"path"
	"strings"
	"text/template"

	"github.com/common-fate/granted-approvals/accesshandler/pkg/providerregistry"
	"github.com/common-fate/granted-approvals/accesshandler/pkg/providers"
	"github.com/common-fate/granted-approvals/accesshandler/pkg/psetup"
	"github.com/common-fate/granted-approvals/pkg/gconfig"
	"github.com/urfave/cli/v2"
)

var GenerateCommand = cli.Command{
	Name: "generate",
	Action: func(c *cli.Context) error {
		err := os.RemoveAll("./docs/approvals/providers/docs/")
		if err != nil {
			return err
		}
		registry := providerregistry.Registry()
		for providerType, providerVersions := range registry.Providers {
			for providerVersion, registeredProvider := range providerVersions {
				if configer, ok := registeredProvider.Provider.(gconfig.Configer); ok {
					cfg := configer.Config()
					setuper, ok := registeredProvider.Provider.(providers.SetupDocer)
					if ok {
						providerFolder := path.Join("./docs/approvals/providers/", providerType)
						err := os.MkdirAll(providerFolder, os.ModePerm)
						if err != nil {
							return err
						}
						instructions, err := psetup.ParseDocsFS(setuper.SetupDocs(), cfg, psetup.TemplateData{
							AccessHandlerExecutionRoleARN: "{{ Access Handler Execution Role ARN }}",
						})
						if err != nil {
							return err
						}
						f, err := os.Create(path.Join(providerFolder, providerVersion+".md"))
						if err != nil {
							return err
						}
						defer f.Close()

						tmpl, err := template.New("instruction").Parse(InstructionTemplate)
						if err != nil {
							return err
						}
						instructionData := TemplateData{
							Steps:    []Step{},
							Provider: providerType,
							Version:  providerVersion,
						}
						for _, inst := range instructions {
							step := Step{
								Title:        inst.Title,
								Instructions: inst.Instructions,
								ConfigFields: []ConfigField{},
							}
							for _, field := range inst.ConfigFields {
								step.ConfigFields = append(step.ConfigFields, ConfigField{
									Key:         field.Key(),
									Description: field.Description(),
								})
							}
							instructionData.Steps = append(instructionData.Steps, step)
						}

						instructionsOutput := new(strings.Builder)
						tmpl.Option()
						err = tmpl.ExecuteTemplate(instructionsOutput, "instruction", instructionData)
						if err != nil {
							return err
						}
						_, err = f.WriteString(instructionsOutput.String())
						if err != nil {
							return err
						}
					}
				}
			}

		}
		return nil
	},
}

type ConfigField struct {
	Key         string
	Description string
}
type Step struct {
	Title        string
	Instructions string
	ConfigFields []ConfigField
}

type TemplateData struct {
	Steps    []Step
	Provider string
	Version  string
}

const InstructionTemplate string = `# {{ .Provider }}@{{ .Version }}
{{- range $ix, $option := .Steps}}
## {{ $option.Title }}
### Configuration Fields
This step will guide you through collecting the values for these fields required to setup your provider.

| Field | Description |
| ----------- | ----------- |
{{- range $ix, $field := $option.ConfigFields}}
| {{ $field.Key }} | {{ $field.Description }} |
{{- end}}
{{ $option.Instructions }}
{{- end}}
`
