const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

// 注册CORS中间件
fastify.register(cors, {
    origin: true
});

// 计算器功能实现
function calculator(operation, a, b) {
    switch (operation) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0) {
                throw new Error('除数不能为零');
            }
            return a / b;
        case 'sqrt':
            if (a < 0) {
                throw new Error('不能对负数开平方');
            }
            return Math.sqrt(a);
        default:
            throw new Error('不支持的操作');
    }
}

// MCP协议要求的元数据
const mcp_metadata = {
    name: "简单计算器",
    description: "提供加减乘除四则运算",
    version: "1.0.0",
    contact: "example@example.com",
    auth: {
        type: "none"
    },
    supported_mcp_methods: ["mcp.functions.list", "mcp.functions.call"]
};

// 注册MCP函数列表路由
fastify.post('/mcp.functions.list', async (request, reply) => {
    return {
        functions: [
            {
                name: "calculator",
                description: "执行基础的四则运算和开平方",
                parameters: {
                    type: "object",
                    properties: {
                        operation: {
                            type: "string",
                            description: "操作类型: add, subtract, multiply, divide, sqrt",
                            enum: ["add", "subtract", "multiply", "divide", "sqrt"]
                        },
                        a: {
                            type: "number",
                            description: "第一个操作数（对于开平方运算，这是要开方的数）"
                        },
                        b: {
                            type: "number",
                            description: "第二个操作数（对于开平方运算，此参数可选）"
                        }
                    },
                    required: ["operation", "a"]
                },
                returns: {
                    type: "number",
                    description: "计算结果"
                }
            }
        ]
    };
});

// 注册MCP函数调用路由
fastify.post('/mcp.functions.call', async (request, reply) => {
    const { function_name, parameters } = request.body;

    if (function_name !== 'calculator') {
        reply.code(404);
        return { error: "找不到请求的函数" };
    }

    try {
        const { operation, a, b } = parameters;
        const result = calculator(operation, a, b);
        return { result };
    } catch (error) {
        reply.code(400);
        return { error: error.message };
    }
});

// 健康检查端点
fastify.get('/health', async (request, reply) => {
    return { status: 'ok' };
});

// 元数据端点
fastify.get('/mcp.metadata', async (request, reply) => {
    return mcp_metadata;
});

// 启动服务器
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log(`服务器运行在 ${fastify.server.address().port} 端口`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start(); 