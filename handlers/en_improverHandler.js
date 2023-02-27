import catchAsync from '../utils/catchAsync.js';
import { api } from '../server.js';
import BotError from '../utils/botError.js';

let conversation = null;

async function improver(question) {
  if (conversation !== null) {
    conversation = await api.sendMessage(
      `أريدك أن تعمل كمترجم إنجليزي ومصحح إملائي ومُحسِّن. سأتحدث معك بأي لغة وستكتشف اللغة وترجمتها وتجيب بالنسخة المصححة والمحسنة من نصي باللغة الإنجليزية. أريدك أن تستبدل كلمات وجمل المستوى A0 المبسطة بكلمات وجمل إنجليزية أكثر جمالاً وأناقة. حافظ على المعنى نفسه ، ولكن اجعلهم أكثر أدبية. أريدك أن تجيب فقط على التصحيح والتحسينات ولا شيء غير ذلك ، لا تكتب التفسيرات. جملتي الأولى هي"${question}"`,
      {
        conversationId: conversation.conversationId,
        parentMessageId: conversation.messageId,
      }
    );
  } else {
    conversation = await api.sendMessage(question);
  }

  return conversation.response;
}

export default catchAsync(async ctx => {
  if (ctx.message.from.is_bot)
    throw new BotError(
      'مستخدم غير مصرح له. فقط للبشر',
      '/en_improver',
      ctx
    );

  const words = ctx.message.text.split(' ');

  words.shift();

  let question = words.join(' ');

  if (question.length == 0)
    throw new BotError(
      'آسف! الرجاء كتابة شيء بعد /en_improver',
      '/en_improver',
      ctx
    );

  ctx.sendChatAction('typing');

  ///////////////////////

  const response = await improver(question);

  ctx.reply(response, {
    reply_to_message_id: ctx.message.message_id,
  });
});
