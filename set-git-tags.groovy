import hudson.model.*
import jenkins.model.*

// Define the repository URL and credentials
def gitUrl = 'https://github.com/TiagoLuz9292/online_marketplace.git'
def credentialsId = 'github'

// Clone the repository and get tags
def tags = []
def gitOutput = 'git ls-remote --tags ' + gitUrl
def proc = gitOutput.execute()
proc.in.eachLine { line ->
    def tagMatch = line =~ /\trefs\/tags\/(.*)/
    if (tagMatch) {
        tags << tagMatch[0][1]
    }
}
proc.waitFor()

// Set choice parameter for APPLICATION_VERSION
def job = Jenkins.instance.getItem('online_marketplace_deploy')
def paramDefinition = new ChoiceParameterDefinition('APPLICATION_VERSION', tags as String[], 'Choose a tag to deploy')
def paramProperty = new ParametersDefinitionProperty(paramDefinition)

job.removeProperty(ParametersDefinitionProperty)
job.addProperty(paramProperty)
job.save()
