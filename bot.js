import { Bot } from "grammy";
const token = process.env.BOT_TOKEN;
if (!token)
    throw new Error("BOT_TOKEN is not set");
const bot = new Bot(token);
let nextTaskId = 1;
const customReplies = [];
bot.command("start", (ctx) => ctx.reply([
    "欢迎使用钕同bot",
    "可用命令：",
    "添加关键词回复  /add 关键词:回复内容",
    "删除指定任务    /del 任务ID",
    "查看任务列表喵  /list",
].join("\n")));
bot.command("add", async (ctx) => {
    const text = ctx.message?.text;
    const payload = text?.replace(/^\/add(@\S+)?\s*/, "").trim();
    if (!payload) {
        await ctx.reply("用法：/add 关键词:回复内容");
        return;
    }
    const separatorIndex = payload.indexOf(":");
    if (separatorIndex === -1) {
        await ctx.reply("格式不对，用法：/add 关键词:回复内容");
        return;
    }
    const keyword = payload.slice(0, separatorIndex).trim();
    const reply = payload.slice(separatorIndex + 1).trim();
    if (!keyword || !reply) {
        await ctx.reply("关键词和回复内容都不能为空");
        return;
    }
    const task = { id: nextTaskId, keyword, reply };
    nextTaskId += 1;
    customReplies.push(task);
    await ctx.reply([`已添加任务 #${task.id}喵`,
        `我看到“${keyword}”时会自动跟跳“${reply}”`,
    ].join("\n"));
});
bot.command("del", async (ctx) => {
    const text = ctx.message?.text;
    const idText = text?.replace(/^\/del(@\S+)?\s*/, "").trim();
    if (!idText) {
        await ctx.reply("用法：/del ID");
        return;
    }
    const taskId = Number(idText);
    if (!Number.isInteger(taskId)) {
        await ctx.reply("ID必须是整数,不要填奇奇怪怪的ID");
        return;
    }
    const taskIndex = customReplies.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
        await ctx.reply("这个ID不存在,你记错了喵。使用/list加载大脑恢复术");
        return;
    }
    const removedTask = customReplies[taskIndex];
    if (!removedTask) {
        await ctx.reply("删除任务失败喵，请重试");
        return;
    }
    customReplies.splice(taskIndex, 1);
    await ctx.reply(`已删除任务喵 #${removedTask.id}：${removedTask.keyword}->${removedTask.reply}`);
});
bot.command("list", async (ctx) => {
    if (customReplies.length === 0) {
        await ctx.reply("还没有人设置跟调捏");
        return;
    }
    const lines = customReplies.map((task) => `#${task.id} ${task.keyword} -> ${task.reply}`);
    await ctx.reply(lines.join("\n"));
});
bot.on("message", async (ctx) => {
    const message = ctx.message; // 消息对象
    const text = message.text;
    if (!text || text.startsWith("/")) {
        return;
    }
    if (text.includes("早安")) {
        await ctx.reply("早安喵，今天也要开心一点");
        return;
    }
    if (text.includes("午安")) {
        await ctx.reply("午安喵，该睡午觉了");
        return;
    }
    if (text.includes("晚安")) {
        await ctx.reply("晚安喵，祝你晚上梦到和女同互相扣扣！？");
        return;
    }
    for (const task of customReplies) {
        if (text.includes(task.keyword)) {
            await ctx.reply(task.reply);
            return;
        }
    }
});
bot.start();
//# sourceMappingURL=bot.js.map