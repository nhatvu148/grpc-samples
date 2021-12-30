client:
	node cmd/client

client-go:
	go run cmd/client/main.go

server:
	node cmd/server

server-go:
	go run cmd/server/main.go

proto:
	protoc \
	--proto_path=proto proto/greet.proto \
	--js_out=import_style=commonjs,binary:./pb \
	--grpc_out=./pb \
	--plugin=protoc-gen-grpc=C:/Users/TechnoStar/AppData/Local/Yarn/bin/grpc_tools_node_protoc_plugin.cmd

proto-go:
	protoc \
	--proto_path=proto proto/greet_go.proto proto/calculator_go.proto \
	--go_out=plugins=grpc:pb

.PHONY: all client server proto