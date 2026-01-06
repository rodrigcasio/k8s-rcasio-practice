# **Practice 2: Pods, Deployments, and Scaling**

This directory contains hands-on exercises for Part 2 of the Kubernetes Introduction. The focus is on moving from manual pod creation to automated, scalable deployments using Nginx.

## **Directory Contents**

* **hello-world-create.yaml**  
  * The initial deployment manifest.  
  * Configures a Deployment with **1 replica**.  
  * Purpose: Establishing the baseline application.  
* **hello-world-apply.yaml**  
  * The updated deployment manifest.  
  * Configures the same Deployment but with **3 replicas**.  
  * Purpose: Demonstrating scaling and load balancing.  
* **GUIDE.md**  
  * A step-by-step instruction manual for this specific lab.  
  * Contains all the commands needed to run this on Arch Linux with Minikube.

## ** Quick Start (Minikube)**

1. **Start the environment**:  
   sudo systemctl start docker  
   minikube start \--driver=docker

2. **Run the Lab**:  
   * Create: kubectl create \-f hello-world-create.yaml  
   * Scale: kubectl apply \-f hello-world-apply.yaml  
   * Expose: kubectl expose deployment hello-world \--port=80 \--type=NodePort  
   * Test: minikube service hello-world

## ** Cleanup**

To save resources on the ThinkPad:

1. kubectl delete \-f .  
2. kubectl delete service hello-world  
3. minikube stop  
4. sudo systemctl stop docker