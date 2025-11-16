import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        this.delimiter = delimiter ?? DEFAULT_DELIMITER;
        if(source.length === 0){
            this.name = "";
            this.noComponents = 0;
        } else {
            this.name = source;
            const partsOfString = this.name.split(this.delimiter);
            this.noComponents = partsOfString.length;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        if (this.name.length === 0){
            return "";
        }
        const partsOfString = this.name.split(this.delimiter);
        return partsOfString.join(delimiter);
    }

    public asDataString(): string {
        if (this.name.length === 0){
            return "";
        }
        if (this.delimiter === DEFAULT_DELIMITER){
            return this.name;
        }
        const partsOfString = this.name.split(this.delimiter);
        return partsOfString.join(DEFAULT_DELIMITER);

    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    public getNoComponents(): number {
         return this.noComponents;
    }

    public getComponent(x: number): string {
        if(n < 0 || n >= this.noComponents){
            throw new RangeError("Index out of range");
        }
        if(this.name.length === 0){
            return "";
        }
        const partsOfString = this.name.split(this.delimiter);
        return partsOfString[n];
    }

    public setComponent(n: number, c: string): void {
        if(n < 0 || n >= this.noComponents){q
            throw new RangeError("Index out of range");
        }
        let partsOfString: string[];
        if (this.name.length === 0) {
                partsOfString = [];
        } else {
                partsOfString = this.name.split(this.delimiter);
        }

        partsOfString[n] = c;
        this.name = partsOfString.join(this.delimiter);
        this.noComponents = partsOfString.length;
    }

    public insert(n: number, c: string): void {
         if (n < 0 || n > this.noComponents) {
             throw new RangeError("Index out of range");
         }

         let partsOfString: string[];
         if (this.name.length === 0) {
             partsOfString = [];
         } else {
             partsOfString = this.name.split(this.delimiter);
         }

         partsOfString.splice(n, 0, c);
         this.name = partsOfString.join(this.delimiter);
         this.noComponents = partsOfString.length;
    }

    public append(c: string): void {
        this.insert(this.noComponents, c);
    }

    public remove(n: number): void {
        if (n < 0 || n >= this.noComponents) {
            throw new RangeError("Index out of range");
        }

        let partsOfString: string[];
        if (this.name.length === 0) {
            partsOfString = [];
        } else {
            partsOfString = this.name.split(this.delimiter);
        }
        partsOfString.splice(n, 1);
        this.name = partsOfString.join(this.delimiter);
        this.noComponents = partsOfString.length;
    }

    public concat(other: Name): void {
        let partsOfString: string[];
        if (this.name.length === 0) {
            partsOfString = [];
        } else {
            partsOfString = this.name.split(this.delimiter);
        }

        for (let i = 0; i < other.getNoComponents(); i++) {
            partsOfString.push(other.getComponent(i));
        }

        this.name = partsOfStrings.join(this.delimiter);
        this.noComponents = partsOfString.length;
    }
}