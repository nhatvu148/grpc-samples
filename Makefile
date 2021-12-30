client:
	node client

server:
	node server

proto:
	protoc --proto_path=proto ./proto/greet.proto --js_out=import_style=commonjs,binary:./pb --grpc_out=./pb --plugin=protoc-gen-grpc=C:/Users/TechnoStar/AppData/Local/Yarn/bin/grpc_tools_node_protoc_plugin.cmd

.PHONY: all client server proto