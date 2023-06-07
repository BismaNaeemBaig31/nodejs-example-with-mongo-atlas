pipeline {
    agent {
        label 'labk8z'
    }
    environment {
        MONGO_URL = credentials('mongo-url')
        DOCKER_CREDS = credentials('github_id')
    }
    stages {
        stage('Git') {
            steps {
                git credentialsId: 'githubnew', url: 'https://github.com/BismaNaeemBaig31/nodejs-example-with-mongo-atlas.git'
            }
        }
        stage('Master Branch') {
            when {
                expression {
                    return env.BRANCH_NAME == 'master'
                }
            }
            steps {
                script {
                    sh "docker login -u $DOCKER_CREDS_USR -p $DOCKER_CREDS_PSW"
                    sh "docker build  -t bismabaig/nodejs:prod-latest -t bismabaig/nodejs:prod-$BUILD_ID ."
                    sh "docker push bismabaig/nodejs:prod-$BUILD_ID"
                    sh "docker logout"
                }
            }
        }
        stage('Dev Branch') {
            when {
                expression {
                    return env.BRANCH_NAME == 'dev'
                }
            }
            steps {
                script {
                    sh "docker login -u $DOCKER_CREDS_USR -p $DOCKER_CREDS_PSW"
                    sh "docker build  -t bismabaig/nodejs:dev-latest -t bismabaig/nodejs:dev-$BUILD_ID ."
                    sh "docker push bismabaig/nodejs:dev-$BUILD_ID"
                    sh "docker logout"
                }
            }
        }
    } // end of stages
    post {
        always {
            script {
                slackSend channel: 'jenkins', color: 'good', message: "${JOB_NAME} ${BUILD_DISPLAY_NAME} started ${MONGO_URL}"
            }
        }
        success {
            script {
                slackSend channel: 'jenkins', color: 'good', message: "${JOB_NAME} ${BUILD_DISPLAY_NAME} success"
            }
        }
        failure {
            script {
                slackSend channel: 'jenkins', color: 'bad', message: "${JOB_NAME} ${BUILD_DISPLAY_NAME} failure"
            }
        }
        unstable {
            script {
                slackSend channel: 'jenkins', color: 'bad', message: "${JOB_NAME} ${BUILD_DISPLAY_NAME} unstable"
            }
        }
    }
}
