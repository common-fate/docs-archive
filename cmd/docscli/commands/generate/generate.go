package generate

import (
	"os"
	"path"
	"strconv"

	"github.com/common-fate/granted-approvals/accesshandler/pkg/providerregistry"
	"github.com/common-fate/granted-approvals/accesshandler/pkg/providers"
	"github.com/common-fate/granted-approvals/accesshandler/pkg/psetup"
	"github.com/common-fate/granted-approvals/pkg/gconfig"
	"github.com/urfave/cli/v2"
)

var GenerateCommand = cli.Command{
	Name: "generate",
	Action: func(c *cli.Context) error {
		registry := providerregistry.Registry()
		for providerType, providerVersions := range registry.Providers {
			for providerVersion, registeredProvider := range providerVersions {
				if configer, ok := registeredProvider.Provider.(gconfig.Configer); ok {
					cfg := configer.Config()
					setuper, ok := registeredProvider.Provider.(providers.SetupDocer)
					if ok {
						providerVersionFolder := path.Join("./docs/approvals/providers/docs/", providerType, providerVersion)
						err := os.MkdirAll(providerVersionFolder, os.ModePerm)
						if err != nil {
							return err
						}
						instructions, err := psetup.ParseDocsFS(setuper.SetupDocs(), cfg, psetup.TemplateData{
							AccessHandlerExecutionRoleARN: "{{ Access Handler Execution Role ARN }}",
						})
						if err != nil {
							return err
						}
						for i, instruction := range instructions {
							f, err := os.Create(path.Join(providerVersionFolder, strconv.Itoa(i)+".md"))
							if err != nil {
								return err
							}
							defer f.Close()
							f.WriteString(instruction.Instructions)
						}
					}
				}
			}

		}
		return nil
	},
}
