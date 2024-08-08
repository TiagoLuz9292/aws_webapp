pipeline {
    agent any

    environment {
        GIT_URL = 'github.com/TiagoLuz9292/online_marketplace.git'
        CREDENTIALS_ID = 'github' // replace with your credentials ID
    }

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'itt', 'uat', 'prod'], description: 'Select the deployment environment')
    }

    stages {
        stage('Fetch Tags') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: env.CREDENTIALS_ID, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                        // Fetch tags
                        def tags = sh(script: "git ls-remote --tags https://${env.GIT_USERNAME}:${env.GIT_PASSWORD}@${env.GIT_URL}", returnStdout: true).trim().readLines().collect { it.split()[1].replaceAll('refs/tags/', '') }
                        
                        // Update the job parameters
                        def job = Jenkins.instance.getItemByFullName(env.JOB_NAME)
                        def newParams = new ArrayList(job.getProperty(hudson.model.ParametersDefinitionProperty.class).parameterDefinitions)
                        
                        // Find existing APPLICATION_VERSION parameter and replace it
                        def applicationVersionParam = newParams.find { it.name == 'APPLICATION_VERSION' }
                        if (applicationVersionParam) {
                            newParams.remove(applicationVersionParam)
                        }
                        newParams.add(new hudson.model.ChoiceParameterDefinition('APPLICATION_VERSION', tags as String[], 'Choose a tag to deploy'))
                        
                        job.removeProperty(hudson.model.ParametersDefinitionProperty)
                        job.addProperty(new hudson.model.ParametersDefinitionProperty(newParams))
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo "Deploying version ${params.APPLICATION_VERSION} to ${params.ENVIRONMENT} environment"
                    // Add your deployment steps here
                }
            }
        }
    }
}