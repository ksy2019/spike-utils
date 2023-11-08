import { HttpBase } from '../src/http'

test('http基础测试', async () => {
    const httpTes = await HttpBase<{
        name: string
    }, {
        Code: number
    }>({
        method: 'post',
        url: 'http://127.0.0.1/api/get',
    })
    expect(httpTes.Code===201).toBe(true)
})