# Commands

- yarn global add grpc-tools
- protoc -I=. ./protos/dummy.proto --js_out=import_style=commonjs,binary:./server --grpc_out=./server --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`
- protoc -I=. ./protos/greet.proto --js_out=import_style=commonjs,binary:./server --grpc_out=./server --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`
- protoc -I=. ./protos/calculator.proto --js_out=import_style=commonjs,binary:./server --grpc_out=./server --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`
- protoc -I=. ./protos/blog.proto --js_out=import_style=commonjs,binary:./server --grpc_out=./server --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`

Windows:

- protoc -I=. ./protos/dummy.proto --js_out=import_style=commonjs,binary:./server --grpc_out=./server --plugin=protoc-gen-grpc=C:/Users/TechnoStar/AppData/Local/Yarn/bin/grpc_tools_node_protoc_plugin.cmd
- protoc -I=. ./protos/greet.proto --js_out=import_style=commonjs,binary:./server --grpc_out=./server --plugin=protoc-gen-grpc=C:/Users/TechnoStar/AppData/Local/Yarn/bin/grpc_tools_node_protoc_plugin.cmd
- protoc -I=. ./protos/calculator.proto --js_out=import_style=commonjs,binary:./server --grpc_out=./server --plugin=protoc-gen-grpc=C:/Users/TechnoStar/AppData/Local/Yarn/bin/grpc_tools_node_protoc_plugin.cmd
- protoc -I=. ./protos/blog.proto --js_out=import_style=commonjs,binary:./server --grpc_out=./server --plugin=protoc-gen-grpc=C:/Users/TechnoStar/AppData/Local/Yarn/bin/grpc_tools_node_protoc_plugin.cmd
