pipeline {
    agent any

    environment {
        GIT_URL = 'https://github.com/TiagoLuz9292/online_marketplace.git'
    }

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'itt', 'uat', 'prod'], description: 'Select the deployment environment')
        gitParameter(name: 'APPLICATION_VERSION', type: 'PT_TAG', branch: '', tagFilter: '*', defaultValue: 'main', description: 'Select a version tag', selectedValue: 'DEFAULT', sortMode: 'DESCENDING_SMART', useRepository: GIT_URL)
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        doGenerateSubmoduleConfigurations: false,
                        extensions: [[$class: 'SubmoduleOption', disableSubmodules: false, parentCredentials: false, recursiveSubmodules: true, reference: '', trackingSubmodules: false]],
                        submoduleCfg: [],
                        userRemoteConfigs: [[credentialsId: 'github', url: GIT_URL]]
                    ])
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