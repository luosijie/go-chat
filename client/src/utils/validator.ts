type Value = string | number | boolean

type FormData = {
    [key:string]: Value
}

type Rule = {
    reg: RegExp
    required: boolean
    msg: string
}

export type RuleMap = {
    [key: string]: Array<Rule>
}

type Result = {
    valid: boolean
    msg: string
    rule?: Rule | null
    value?: Value | null
}

// Only return the first error
export function validate(formData: FormData, ruleMap: RuleMap): Result {
    const result:Result = {
        valid: true,
        msg: 'success'
    }

    const keys = Object.keys(formData)
    for (let i = 0; i < keys.length; i++) {
        if (!result.valid) break

        const key = keys[i]

        const value = formData[key]

        const rules = ruleMap[key]

        for (let i = 0; i < rules.length; i++) {
            const rule  = rules[i]
            const reg = rule.reg
            const valueStr = String(value)

            result.rule = rule
            result.value = value

            if (rule.required) {
                if (!valueStr) {
                    result.valid = false
                    break
                }

                if (!reg.test(valueStr)) {
                    result.valid = false
                    break
                }
            } else {
                if (valueStr && !reg.test(valueStr)) {
                    result.valid = false
                    break
                }
            }
        }
        
    }

    if (result.valid) {
        delete result.rule
        delete result.value
    } else {
        if (result.rule) result.msg = result.rule.msg
    }

    return result
    
}