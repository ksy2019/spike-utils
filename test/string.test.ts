import { FormatBlankByString, ToHump, ToLine, base64 } from "../src/string";

test('stringBase',()=>{
    const srcData='LastName'
    let target = ToHump(srcData,false)
    expect(target ==='lastName').toBe(true)
    target = ToHump(target,true)
    expect(target ==='LastName').toBe(true)
    target = ToLine(target)
    expect(target ==='_last_name').toBe(true)
    const one  = FormatBlankByString(undefined,'')
    expect(one === '').toBe(true)
})

test('Base64',()=>{
    const srcData='LastName'
    const encode = base64.Encode(srcData)
    const decode = base64.Decode(encode)
    expect(decode === srcData).toBe(true)
})