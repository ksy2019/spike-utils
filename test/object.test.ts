import { Assign, DeepClone, Queue } from '../src/object'

const srcData = {
    name: 'lks'
}

test('DeepClone测试', () => {
    const cloneData = DeepClone(srcData)
    cloneData.name = 'wym'
    expect(cloneData.name !== srcData.name).toBe(true)
})


test('Assign测试', () => {
    const source = {
        age: 3,
        name: 'lks'
    }
    const target = {
        age: 12,
        name: 'lks'
    }
    const cloneData = Assign(source, target)
    expect(cloneData.age === target.age).toBe(true)


    const fakeData = {
        age: 21
    }
    const cloneData2 = Assign(source, fakeData)
    expect(cloneData2.age === fakeData.age).toBe(true)
})



test('Queue测试', async () => {

    const queue = new Queue()

    const params1 = 123

    const test1 = () => {
        return new Promise<number>((resolve) => {
            setTimeout(() => {
                resolve(params1)
            }, 300)
        })
    }


    const test2 = (name: string, age: number) => {
        return new Promise<{ name: string, age: number }>((resolve) => {
            setTimeout(() => {
                resolve({ name, age: age + 2 })
            }, 200)
        })
    }

    const resolve1 = await queue.Exec(test1)
    const resolve2 = await queue.Exec(test2, ['lks', 2])
    expect(resolve1 === params1).toBe(true)
    expect(resolve2.name === 'lks' && resolve2.age === 4).toBe(true)
})