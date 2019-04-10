const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

function post(parent, args, context, info) {
  const userId = getUserId(context);
  console.log("returned userID:", userId);

  const result = context.prisma.createNote({
    title: args.title,
    note: args.note,
    check: args.check,
    tag: args.tag,
    // postedBy: { id: userId }
    postedBy: { connect: { id: userId } }
  });
  //   console.log("returned result: ", result.postedBy());
  return result;
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const secret = await bcrypt.hash(args.secret, 10);
  console.log("secret: ", secret, " password: ", password)
  const user = await context.prisma.createUser({ ...args, password, secret });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

async function recover(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });

  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.secret, user.secret);
  if (!valid) {
    throw new Error("Invalid secret");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

module.exports = {
  post,
  signup,
  login
};
