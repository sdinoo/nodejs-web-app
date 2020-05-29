const http = require('http');
const k8s = require('@kubernetes/client-node');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const msg = 'Hello Node!\n'
  res.end(msg);
});

const kc = new k8s.KubeConfig();
kc.loadFromCluster();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
k8sApi.listNamespacedPod('api-hub-operator-project')
    .then((res) => {
	console.log(res.body);
    })
    .catch((err) => {
        console.log(err);
    });

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
