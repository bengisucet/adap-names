import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

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



    /*public isEqual(other: Name): boolean {
        throw new Error("needs implementation or deletion");
    }
    //moved to abstractname
    public getHashCode(): number {
        throw new Error("needs implementation or deletion");
    }*/

     public isEmpty(): boolean {
            return this.noComponents === 0;
        }

    public getDelimiterCharacter(): string {
            return this.delimiter;
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
}