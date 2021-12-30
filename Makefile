client:
	node client

server:
	node server

proto:
	protoc -I=. ./protos/greet.proto --js_out=import_style=commonjs,binary:./server --grpc_out=./server --plugin=protoc-gen-grpc=C:/Users/TechnoStar/AppData/Local/Yarn/bin/grpc_tools_node_protoc_plugin.cmd

.PHONY: all client server proto