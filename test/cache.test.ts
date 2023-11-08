import { CacheSet,CacheGet } from '../src/index'


test('cache-test',()=>{
    const target = {
        age: 12,
        name: 'lks'
    } 
    
    CacheSet('name',target.name)
    expect(CacheGet('name') === target.name).toBe(true)
})