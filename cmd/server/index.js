const greets = require("../../pb/greet_pb");
const service = require("../../pb/greet_grpc_pb");
const fs = require("fs");
const grpc = require("grpc");

const greet = (call, callback) => {
  const greeting = new greets.GreetResponse();

  greeting.setResult(
    "Hello " +
      call.request.getGreeting().getFirstName() +
      " " +
      call.request.getGreeting().getLastName()
  );

  callback(null, greeting);
};

const greetManyTimes = (call, callback) => {
  const firstName = call.request.getGreeting().getFirstName();
  const lastName = call.request.getGreeting().getLastName();

  let count = 0,
    intervalID = setInterval(function () {
      const greetManyTimesResponse = new greets.GreetManyTimesResponse();
      greetManyTimesResponse.setResult(firstName + lastName);

      // setup streaming
      call.write(greetManyTimesResponse);
      if (++count > 9) {
        clearInterval(intervalID);
        call.end(); // we have sent all messages!
      }
    }, 1000);
};

const longGreet = (call, callback) => {
  call.on("data", (request) => {
    const fullName =
      request.getGreet().getFirstName() +
      " " +
      request.getGreet().getLastName();

    console.log("Hello " + fullName);
  });

  call.on("error", (error) => {
    console.error(error);
  });

  call.on("end", () => {
    const response = new greets.LongGreetResponse();
    response.setResult("Long Greet Client Streaming.....");

    callback(null, response);
  });
};

const sleep = async (interval) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), interval);
  });
};

const greetEveryone = async (call, callback) => {
  call.on("data", (response) => {
    const fullName =
      response.getGreet().getFirstName() +
      " " +
      response.getGreet().getLastName();

    console.log("Hello " + fullName);
  });

  call.on("error", (error) => {
    console.error(error);
  });

  call.on("end", () => {
    console.log("Server The End...");
  });

  for (let i = 0; i < 10; i++) {
    // const greeting = new greets.Greeting()
    // greeting.setFirstName('Aki')
    // greeting.setLastName('Yama')

    const request = new greets.GreetEveryoneResponse();
    request.setResult("Aki Yama");

    call.write(request);
    await sleep(1000);
  }

  call.end();
};

const main = () => {
  const server = new grpc.Server();

  server.addService(service.GreetServiceService, {
    greet: greet,
    greetManyTimes: greetManyTimes,
    longGreet: longGreet,
    greetEveryone: greetEveryone,
  });

  server.bind("127.0.0.1:43567", grpc.ServerCredentials.createInsecure());
  server.start();

  console.log("Server running on port 127.0.0.1:43567");
};

main();
