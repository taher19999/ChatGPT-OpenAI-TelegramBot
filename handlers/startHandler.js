import catchAsync from '../utils/catchAsync.js';

export default catchAsync(async ctx => {
  await ctx.reply(
    'مرحبا بك في بوت الذكاء الاصطناعي غير رسمي لشركة openAI\n\n اكتب /help للمساعدة\n\n مطور البوت:@ta_ja199 '
  );
});
