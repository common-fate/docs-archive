# Telemetry

Common Fate collects anonymous telemetry data to help improve our product. Participation is optional and users have the ability to opt-out at any point. Telemetry has been implemented through our community RFD process and we encourage feedback via discussion comments on [RFD#8](https://github.com/common-fate/rfds/discussions/8).

## Why Collect Telemetry?

As developers of Common Fate we have very little insight into how the product is used beyond our own team. Typically we find out about product deployments because a community member joins our community Slack (usually when they have challenges getting started). Community members with successful deployments tend to be quieter because everything is working well. In the latter use case we have no visibility over product usage. Visibility into such usage is helps us to prioritize new product features in accordance with the purposes listed below.

We collect anonymous product analytics for [Common Fate](https://github.com/common-fate/common-fate).

# Common Fate

## What is Collected?

General usage information is tracked, such as product versioning and plugins in use.

| Metric                                                | Purpose                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Access Providers in use.                              | Helps us to understand the impact of changes to providers; for widely-used alpha-version providers we will provide scripts to automatically update Access Rules when changes are made to Access Providers. Helps inform the direction of the project with the kinds of new Access Providers that are developed.                          |
| Percentage of Access Rules requiring manual approval. | Helps us prioritize manual approval policy improvements (such as 2-person approval for access) versus automated approval policy improvements (such as associating Linear/Jira tickets with access requests, or integrating with PagerDuty and other on-call platforms)                                                                   |
| Access Request time to approval.                      | One of the core values of Common Fate is that the access request workflow must be extremely fast. This includes the approval aspect. Our goal is that the median approval time is less than 10 minutes but we have no way to measure this. Helps drive improvements around the request workflow, such as our notifications to approvers. |
| Common Fate version number.                           | Helps us prioritise backporting patches to previous versions.                                                                                                                                                                                                                                                                            |

:::note
The above list undergoes frequent audit to ensure accuracy.
:::

To view exactly what telemetry data is being collected, add the following parameter to your `granted-deployment.yml` file:

```yaml
deployment:
  parameters:
    AnalyticsLogLevel: "debug"
```

When the `AnalyticsLogLevel` parameter is set, analytics events will be printed to your deployment’s CloudWatch log groups when data is collected.

Below is an example of a telemetry event:

```json
{
  "batch": [
    {
      "distinct_id": "usr_-CHh8_rdIqAotcBsP64GKQkfzW2hb1JDJ_6u7q4zom4",
      "event": "cf:request.created",
      "library": "cf-analytics-go",
      "library_version": "dev",
      "properties": {
        "$groups": {
          "deployment": "dep_123"
        },
        "$lib": "cf-analytics-go",
        "$lib_version": "dev",
        "has_reason": true,
        "provider": "commonfate/test-provider@v1",
        "requested_by": "usr_-CHh8_rdIqAotcBsP64GKQkfzW2hb1JDJ_6u7q4zom4",
        "requires_approval": true,
        "rule_id": "rul_LNS4E5we6G3DpSsY2DnEu8coV7azNnjuUztaQ5SW0jo",
        "timing": {
          "duration_seconds": 100,
          "mode": "asap"
        }
      },
      "timestamp": "2009-11-10T23:00:00Z",
      "type": "capture"
    }
  ]
}
```

The full list of events, along with example data for each, can be found at the open source [analytics-go](https://github.com/common-fate/analytics-go) repository.

## Opting Out

To opt out of product analytics, add the following entry to your `granted-deployment.yml` file and update your deployment:

```yaml
deployment:
  parameters:
    AnalyticsDisabled: "true"
```

To re-enable the collection of telemetry data, simply remove the `AnalyticsDisabled` entry.

## Handling of Sensitive Data

Given the nature of the project, collecting usage information is sensitive. We do not collect any identifiable information. This includes email addresses, AWS account IDs, Access Rule names/descriptions, deployment region, and identifiable deployment characteristics like a sign-in URL which may contain a company’s name. When collecting analytics we do not log IP addresses. We have implemented server-side analytics only, and are not planning on adding any client-side analytics JavaScript to the Common Fate web dashboards.

All telemetry data collected aligns with the [Common Fate privacy policy](/privacy-policy).

## Sharing of Data

Collected data is completely anonymous, untraceable, and personally unidentifiable. The data holds meaning only in its aggregate form.

To better understand collected telemetry data, we have adopted the following third party sub-processors:

- [CloudFlare Workers](https://workers.cloudflare.com/)
- [PostHog](https://posthog.com/)

We plan to publish key metrics back to the community and share insights to openly discuss our roadmap. These metrics will be published in aggregate form only across all deployments.
