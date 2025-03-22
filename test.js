// 测试MCP服务器计算功能的简单脚本
const http = require('http');

// 通用请求函数
function makeRequest(path, data) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                try {
                    resolve(JSON.parse(responseData));
                } catch (e) {
                    resolve(responseData);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

// 测试MCP函数列表
async function testFunctionsList() {
    console.log("测试 mcp.functions.list:");
    const response = await makeRequest('/mcp.functions.list', {});
    console.log(JSON.stringify(response, null, 2));
    console.log("---------------------");
}

// 测试计算器功能
async function testCalculator(operation, a, b) {
    console.log(`测试计算: ${a} ${operation} ${b}`);
    const response = await makeRequest('/mcp.functions.call', {
        function_name: 'calculator',
        parameters: { operation, a, b }
    });
    console.log("结果:", response);
    console.log("---------------------");
}

// 运行所有测试
async function runTests() {
    try {
        // 测试函数列表
        await testFunctionsList();

        // 测试各种计算操作
        await testCalculator('add', 5, 3);
        await testCalculator('subtract', 10, 4);
        await testCalculator('multiply', 6, 7);
        await testCalculator('divide', 20, 5);

        // 测试错误情况: 除以零
        try {
            await testCalculator('divide', 10, 0);
        } catch (error) {
            console.log("预期错误 (除以零):", error.message);
        }

        console.log("所有测试完成!");
    } catch (error) {
        console.error("测试过程中发生错误:", error);
    }
}

// 确保服务器已经启动后再运行测试
console.log("请确保MCP服务器已启动在端口3000");
console.log("开始测试...");
runTests(); 