import catchAsync from '../utils/catchAsync.js';

export default catchAsync(async ctx => {
  await ctx.reply(
    '\u{1F916}الإوامر!\
    \nاكتب الأوامر التالية للتحدث معي!\
     \n\n/ask -اسألني ماذا تريد.\
  \n\n/exit - محادثة مباشرة.'
  );
});
