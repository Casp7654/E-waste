// Custom Types
export type passCallback = (param: any, ...args: any) => any;

export default class RequestValidator {

    public validateJsonBodyKeys(holder: Object, keys: Array<string>): boolean {
        const holderKeys: Array<string> = Object.keys(holder);

        // Check object key array length
        if (holderKeys.length === 0)
            return false;

        // getKeys if exists in Array
        let foundKeys = keys.filter((value: string) => {
            let holderIndex = holderKeys.findIndex((holderValue: string) => (holderValue === value));
            if (holderIndex !== -1) {
                if (holderKeys[holderIndex] !== undefined) {
                    return value;
                }
            }
        });

        // Report true if all is present
        return (foundKeys.length === keys.length);
    }

    public validateKey(holder: Object, subject: { key: string, pass: passCallback }): boolean {
        // Check object key array length
        if (Object.keys(holder).length === 0)
            return false;

        // Check if value key exists
        let value: string;
        if ((value = eval(`holder.${subject.key}`)) === undefined)
            return false;

        // Test if value is passable
        return subject.pass(value);
    }

    public validateKeys(holder: Object, subjects: Array<{ key: string, pass: passCallback }>): boolean {
        // Setup result array
        let failures: Array<string> = [];

        // Run Validate on each key
        subjects.map((subject: { key: string, pass: passCallback }) => {
            if (!this.validateKey(holder, subject))
                failures = [...failures, subject.key];
        });

        // Report true if all passes are passed.
        return failures.length === 0;
    }

}