






## Output after creating pod (imperative way)

```bash
$kubectl run hello-world-pod \
--image=nginx
pod/hello-world-pod created

rodrig@rcasio-Archon ibm_practice]$ kubectl get pods -o wide
NAME              READY   STATUS    RESTARTS   AGE   IP           NODE       NOMINATED NODE   READINESS GATES
hello-world-pod   1/1     Running   0          45s   10.244.0.9   minikube   <none>           <none>

kubectl describe pod hello-world-pod

rodrig@rcasio-Archon ibm_practice]$ kubectl describe pod hello-world-pod
Name:             hello-world-pod
Namespace:        default
Priority:         0
Service Account:  default
Node:             minikube/192.168.49.2
Start Time:       Tue, 06 Jan 2026 15:00:51 -0600
Labels:           run=hello-world-pod
Annotations:      <none>
Status:           Running
IP:               10.244.0.9
IPs:
  IP:  10.244.0.9
Containers:
  hello-world-pod:
    Container ID:   docker://3c832ad9cc05102304cbbc39433d978e07820bda3369f8a826a6370361cf6749
    Image:          nginx
    Image ID:       docker-pullable://nginx@sha256:ca871a86d45a3ec6864dc45f014b11fe626145569ef0e74deaffc95a3b15b430
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Tue, 06 Jan 2026 15:00:53 -0600
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-6k8g8 (ro)
Conditions:
  Type                        Status
  PodReadyToStartContainers   True
  Initialized                 True
  Ready                       True
  ContainersReady             True
  PodScheduled                True
Volumes:
  kube-api-access-6k8g8:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    Optional:                false
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  78s   default-scheduler  Successfully assigned default/hello-world-pod to minikube
  Normal  Pulling    77s   kubelet            spec.containers{hello-world-pod}: Pulling image "nginx"
  Normal  Pulled     77s   kubelet            spec.containers{hello-world-pod}: Successfully pulled image "nginx" in 855ms (855ms including waiting). Image size: 151890389 bytes.
  Normal  Created    76s   kubelet            spec.containers{hello-world-pod}: Created container: hello-world-pod
  Normal  Started    76s   kubelet            spec.containers{hello-world-pod}: Started container hello-world-pod

rodrig@rcasio-Archon ibm_practice]$ kubectl delete pod hello-world-pod
pod "hello-world-pod" deleted from default namespace
rodrig@rcasio-Archon ibm_practice]$

```
```

```

