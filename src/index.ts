type GreetingMessage = string;
const greeting: GreetingMessage = "Hello, World!";
const greetingFunction = (): void => {
  console.log(greeting);
};

export { greeting, greetingFunction, type GreetingMessage };
