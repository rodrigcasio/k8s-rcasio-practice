## Build and Deployment Guide for Custom Node.js Application

This document outlines the procedure for containerizing a local application and deploying it to a Kubernetes cluster on **Arch Linux** using **minikube**.

1. Application Development

A simple web server was created using Node.js (app.js). This application listens on port 8080 and returns a message including the hostname of the pod it is running on.

2. Containerization

A Dockerfile was created to package the Node.js code. The process involved:

Using a lightweight Node.js base image.

Setting the working directory to /app.

Copying the source code into the image.

Defining the startup command.

3. Image Management (Docker Commands)

Before Kubernetes can use the app, we have to build the image and send it to Docker Hub.

Build the image:
`docker build -t rodrigocasio/my-first-k8s-app:v1 .`

Push to Docker Hub:
`docker push rodrigocasio/my-first-k8s-app:v1`

4. Kubernetes Deployment (kubectl Commands)

The application is deployed using the following commands:

Apply the configuration:
`kubectl apply -f deployment.yaml`

Expose the deployment as a service:
`kubectl expose deployment rodrig-app-deployment --type=NodePort --port=8080`

Check the status of your pods:
`kubectl get pods`

Watch pods in real-time (useful for debugging):
`kubectl get pods -w`

Check the status of your services:
`kubectl get svc`

5. Verification & Testing

To see the app running on your Arch Linux machine:

Open the service in browser:
`minikube service rodrig-app-deployment`

Troubleshoot (if pods fail to start):
`kubectl describe pod <pod-name>`

View logs (if the app crashes):
`kubectl logs <pod-name>`

6. Cleanup

To stop the application and free up system resources:

`kubectl delete deployment rodrig-app-deployment`

`kubectl delete service rodrig-app-deployment`

`minikube stop`
