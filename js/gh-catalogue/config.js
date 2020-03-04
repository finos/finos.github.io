var config = {
  "states" : {
    "ACTIVATION" : "https://finosfoundation.atlassian.net/wiki/spaces/FINOS/pages/75530376/Activation",
    "ARCHIVED" : "https://finosfoundation.atlassian.net/wiki/spaces/FINOS/pages/75530367/Archived",
    "INCUBATING" : "https://finosfoundation.atlassian.net/wiki/spaces/FINOS/pages/75530363/Incubating",
    "PAUSED" : "https://finosfoundation.atlassian.net/wiki/spaces/FINOS/pages/93290700/Paused",
    "RELEASED" : "https://finosfoundation.atlassian.net/wiki/spaces/FINOS/pages/75530371/Active"
  },
  "filters" : {
    "programShortName" : {
      "label" : "Program",
      "labelField" : "programName"
    },
    "type" : {
      "label" : "Type",
      "valueLabels" : {
        "PROJECT": "Project",
        "WORKING_GROUP":"Working Group"
      }
    },
    "state" : {
      "label" : "State",
      "valueLabels" : {
        "ARCHIVED": "Archived",
        "INCUBATING": "Incubating",
        "OPERATING": "Operating",
        "PAUSED": "Paused",
        "RELEASED": "Active"
      }
    },
    "languages" : {
      "label" : "Language",
      "valueKeys" : {
        "c-sharp" : "C#"
      },
      "valueLabels" : {
        "Objective_C" : "Objective C",
        "Objective_C++" : "Objective C++"
      }
    }
  },
  "sort" : {
    "valueLabels" : {
      "hotness-up": "Heat ↑",
      "hotness-down": "Heat ↓",
      "name-up": "Name ↑",
      "name-down": "Name ↓",
    }
  },
  "repos" : {
    "symphony-java-client": {
      "description": "A Java Client (SJC) for the Symphony platform",
      "docs-link": "http://symphonyoss.github.io/symphony-java-client/"
    },
    "symphony-java-sample-bots": {
      "docs-link": "http://symphonyoss.github.io/symphony-java-sample-bots/"
    },
    "ssf-parent-pom": {
      "docs-link": "http://symphonyoss.github.io/ssf-parent-pom/",
      "description" : "the SSF Maven Parent POM"
    },
    "clj-symphony": {
      "docs-link": "https://symphonyoss.github.io/clj-symphony/"
    }
  }
};
