const { contentScripts, joplin } = require('joplin-plugin-api');

// 注册插件命令
joplin.commands.register({
  name: 'insertCurrentDate',
  label: '插入当前日期',
  iconName: 'fas fa-calendar',
  execute: async () => {
    // 获取当前日期
    const currentDate = new Date().toLocaleDateString();
    // 创建新的笔记
    const note = await joplin.workspace.createNote();
    // 将日期插入到笔记内容中
    await joplin.commands.execute('editor.insertText', currentDate);
    // 保存笔记
    await joplin.data.put(['notes', note.id], { body: note.body });
  },
});

// 注册内容脚本
contentScripts.register(
  contentScripts.PostMessageService,
  'insert_current_date',
  async (event) => {
    // 监听 Joplin 中的菜单事件
    if (event.name === 'command' && event.command === 'insertCurrentDate') {
      // 执行插件命令
      await joplin.commands.execute(event.command);
    }
  }
);

