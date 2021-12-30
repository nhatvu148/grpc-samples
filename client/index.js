const greets = require("../pb/greet_pb");
const service = require("../pb/greet_grpc_pb");
const grpc = require("grpc");
const fs = require("fs");

const unsafCreds = grpc.credentials.createInsecure();

const callGreetings = () => {
  console.log("Hello from Client!");
  const client = new service.GreetServiceClient(
    "localhost:43567",
    grpc.credentials.createInsecure()
  );

  // create our request
  const request = new greets.GreetRequest();

  // create a protocol buffer greeting message
  const greeting = new greets.Greeting();
  greeting.setFirstName("Nhat");
  greeting.setLastName("Vu");

  // set the Greeting
  request.setGreeting(greeting);

  client.greet(request, (error, response) => {
    if (!error) {
      console.log("Greeting Response: ", response.getResult());
    } else {
      console.error(error);
    }
  });
};

const callGreetManyTimes = () => {
  // Created our server client
  const client = new service.GreetServiceClient("localhost:43567", unsafCreds);

  // create request
  const request = new greets.GreetManyTimesRequest();

  const greeting = new greets.Greeting();
  greeting.setFirstName("Nhat");
  greeting.setLastName("Vu");

  request.setGreeting(greeting);

  const call = client.greetManyTimes(request, () => {});

  call.on("data", (response) => {
    console.log("Client Streaming Response: ", response.getResult());
  });

  call.on("status", (status) => {
    console.log(status.details);
  });

  call.on("error", (error) => {
    console.error(error.details);
  });

  call.on("end", () => {
    console.log("Streaming Ended!");
  });
};

const callLongGreeting = () => {
  // Created our server client
  const client = new service.GreetServiceClient("localhost:43567", unsafCreds);

  const request = new greets.LongGreetRequest();

  const call = client.longGreet(request, (error, response) => {
    if (!error) {
      console.log("Server Response: ", response.getResult());
    } else {
      console.error(error);
    }
  });

  let count = 0,
    intervalID = setInterval(function () {
      console.log("Sending message " + count);

      const request = new greets.LongGreetRequest();
      const greeting = new greets.Greeting();
      greeting.setFirstName("Fuad");
      greeting.setLastName("Akbar");

      request.setGreet(greeting);

      const requestTwo = new greets.LongGreetRequest();
      const greetingTwo = new greets.Greeting();
      greetingTwo.setFirstName("Nhat");
      greetingTwo.setLastName("Vu");

      requestTwo.setGreet(greetingTwo);

      call.write(request);
      call.write(requestTwo);

      if (++count > 3) {
        clearInterval(intervalID);
        call.end(); //we have sent all the messages!
      }
    }, 1000);
};

const sleep = async (interval) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), interval);
  });
};

const callBiDirect = async () => {
  // Created our server client
  console.log("hello I'm a gRPC Client");

  const client = new service.GreetServiceClient(
    "localhost:43567",
    grpc.credentials.createInsecure()
  );
  const request = new greets.GreetEveryoneRequest();

  const call = client.greetEveryone(request, (error, response) => {
    console.log("Server Response: " + response);
  });

  call.on("data", (response) => {
    console.log("Hello Client!" + response.getResult());
  });

  call.on("error", (error) => {
    console.error(error);
  });

  call.on("end", () => {
    console.log("Client The End");
  });

  for (let i = 0; i < 10; i++) {
    const greeting = new greets.Greeting();
    greeting.setFirstName("Nhat");
    greeting.setLastName("Vu");

    const request = new greets.GreetEveryoneRequest();
    request.setGreet(greeting);

    call.write(request);

    await sleep(1000);
  }

  call.end();
};

const main = async () => {
  //   callGreetings();
  //   callGreetManyTimes();
  //   callLongGreeting();
  callBiDirect();
};

main();
