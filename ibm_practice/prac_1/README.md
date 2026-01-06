# K8S PRACTICE LAB 1: Basic Objects

This lab was completed on Arch Linux using Minikube and Docker. It covers the basics of Services, Deployments, StatefulSets, and DaemonSets.

---

## HOW TO START THE ENVIRONMENT

Follow these steps to get your Arch Linux machine ready for practice:

1. Start the Docker Service:
   sudo systemctl start docker

2. Start the Minikube Cluster:
   minikube start --driver=docker

3. Verify the Cluster is Running:
   kubectl get nodes

---

## FILES IN THIS FOLDER

1. deployment.yaml
   - Creates a standard Nginx application.
   - Use this for "stateless" apps (web servers, APIs).
   - Command: kubectl apply -f deployment.yaml

2. statefulset.yaml
   - Creates Nginx pods with fixed names (pod-0, pod-1, pod-2).
   - Use this for "stateful" apps like Databases.
   - Command: kubectl apply -f statefulset.yaml

3. daemonset.yaml
   - Ensures a pod runs on every single node in the cluster.
   - Use this for background tasks like logging or monitoring.
   - Command: kubectl apply -f daemonset.yaml

---

## USEFUL COMMANDS

- To see your web app in the browser:
  minikube service my-service1

- To see all running objects:
  kubectl get all

- To see pod labels:
  kubectl get pods --show-labels

---

## CLEANUP (when lab finished)

1. Delete the lab objects:
   kubectl delete -f .

2. Stop Minikube:
   minikube stop

3. Stop Docker:
   sudo systemctl stop docker
