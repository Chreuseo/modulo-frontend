pipeline {
    agent any

    environment {
        NODE_VERSION = '14.x' // Specify the Node.js version to use
        TARGET_DIR = '/opt/modulo/frontend'
    }

    tools {
        sonarScanner 'SonarScannerCLI'   // genau der Name aus der Global Tool Configuration
    }

    stages {

        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Build the Angular project
                sh 'npm run build'
            }
        }

        stage('SonarQube Analysis') {
          environment {
            // Jenkins füllt SONAR_SCANNER_HOME automatisch, wenn Scanner konfiguriert ist
            PATH = "${env.PATH}:${env.SONAR_SCANNER_HOME}/bin"
          }
          steps {
            withSonarQubeEnv('SonarQube') {
              sh 'sonar-scanner -Dsonar.projectKey=modulo'
            }
          }
        }



        stage('Deploy') {
            steps {
                script {
                    // Clean the target directory
                    sh "sudo rm -rf ${TARGET_DIR}/*"

                    // Copy built files to the target directory
                    sh "sudo cp -r dist/* ${TARGET_DIR}/"
                }
            }
        }
    }

    post {
        always {
            // Clean up any workspace files
            cleanWs()
        }
    }
}
