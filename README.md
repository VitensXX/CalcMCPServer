# 简易MCP计算器服务器

这是一个基于[Model Context Protocol (MCP)](https://modelcontextprotocol.io)实现的简单计算器服务器，提供基础的加减乘除四则运算功能。此项目主要用于学习MCP服务器的基本构建。

## 功能

- 支持四则运算：加法、减法、乘法和除法
- 遵循MCP协议规范
- 包含基础的错误处理（如除以零的情况）

## 安装

```bash
# 克隆项目
git clone <仓库地址>
cd CalcMCPServer

# 安装依赖
npm install
```

## 使用方法

### 启动服务器

```bash
npm start
```

服务器将在本地3000端口启动。

### 测试服务器

服务器启动后，可以运行测试脚本来验证功能：

```bash
node test.js
```

## API端点

- `/mcp.metadata` - 获取服务器元数据（GET）
- `/mcp.functions.list` - 获取可用函数列表（POST）
- `/mcp.functions.call` - 调用函数执行计算（POST）
- `/health` - 健康检查端点（GET）

## 示例请求

### 获取函数列表

```bash
curl -X POST http://localhost:3000/mcp.functions.list -H "Content-Type: application/json" -d '{}'
```

### 执行计算

```bash
curl -X POST http://localhost:3000/mcp.functions.call -H "Content-Type: application/json" -d '{
  "function_name": "calculator",
  "parameters": {
    "operation": "add",
    "a": 5,
    "b": 3
  }
}'
```

## MCP协议

MCP是一个开放的API标准，用于模型服务的交互。本项目实现了MCP的核心功能，包括函数列表和函数调用。

更多关于MCP的信息，请访问 [modelcontextprotocol.io](https://modelcontextprotocol.io)。


## 在Cursor中配置MCP服务器

要在Cursor中配置您的MCP服务器，请按照以下步骤操作：

1. **打开Cursor设置**：

   - 在Cursor中，导航到设置页面，选择“MCP”选项。
2. **添加新的MCP服务器**：

   - 点击右上角的“+ Add new MCP server”按钮。
3. **填写服务器信息**：

   - **名称**：输入一个描述性名称，例如"计算器"。
   - **命令**：设置启动您的服务器的命令，例如：
     ```
     node yourpath/CalcMCPServer/server.js
     ```
   - **服务器链接**：输入服务器地址：
     ```
     http://localhost:3000/mcp
     ```
4. **保存配置**：

   - 点击保存或确认按钮以保存您的MCP服务器配置。
5. **验证配置**：

   - 确保服务器状态显示为"已启用"(Enabled)，并且可以列出可用的工具。
6. **使用MCP服务器**：

   - 在Cursor的对话中，您可以使用计算器工具进行计算，例如“计算5加10”。

### 故障排除

如果在配置过程中遇到问题，请检查以下内容：

- 确保服务器正在运行并监听正确的端口。
- 检查防火墙设置，确保没有阻止Cursor访问本地服务器。

通过这些步骤，您可以在Cursor中成功配置并使用您的MCP服务器。
