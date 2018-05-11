var config = {
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
        "RELEASED": "Released"
      }
    },
    "languages" : {
      "label" : "Language"
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