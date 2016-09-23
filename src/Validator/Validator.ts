import {Request} from "../Http/Request";
import { Inject } from "huject";
var validator = require("validator");

export class Validator {

    @Inject("Request")
    private request: Request;

    private rulesArray: any = {};
    private errorsArray: string[] = [];

    private customValidators = {};

    public rules(rules: any) {
        this.rulesArray = rules;
    }

    public validates(): boolean {
        var passed = true;

        for(var field in this.rulesArray) {
            if (this.rulesArray.hasOwnProperty(field)) {
                passed = passed && this.validatesField(field, this.rulesArray[field]);
            }
        }

        return passed;
    }

    public errors() {
        return this.errorsArray;
    }

    public passed() {
        return this.errorsArray.length == 0;
    }

    public setRequest(request: Request) {
        this.request = request;
    }

    public getRequest() {
        return this.request;
    }

    public registerCustomValidator(ruleName: string, ruleFunction: (field: string, value: string, params: string[]) => boolean) {
        this.customValidators[ruleName] = ruleFunction;
    }

    private validatesField(field:string, rulesString: string): boolean {
        var rules = rulesString.split("|");
        var value = this.request.post(field);

        for (var ruleIndex in rules) {
            //TODO parse args and pass to function

            //Split the rule ruleName:params
            var ruleComponents = rules[ruleIndex].split(":");
            if (ruleComponents.length != 1 && ruleComponents.length != 2) {
                console.log("Rule format unknown");
            }

            //Split the params params1,params2
            var ruleParams = [];
            if (ruleComponents[1] != undefined) {
                ruleParams = ruleComponents[1].split(",");
            }

            var ruleName = ruleComponents[0];
            var fullRuleName = "is" + ruleName.charAt(0).toUpperCase() + ruleName.slice(1);

            var value = this.getRequest().post(field);

            var result = null;
            if (fullRuleName in this) {
                result = this[fullRuleName](field, value, ruleParams);
            } else if (fullRuleName in this.customValidators) {
                result = this.customValidators[fullRuleName](field, value, ruleParams);
            } else {
                //TODO add error validation rule not found
                return false;
            }

            if (result) {
                return true;
            } else {
                //TODO get error message
                //TODO addError
                //TODO return false
            }

            console.log(result);
        }

        return false;
    }

    private addError(field: string, message: string) {
        this.errorsArray[field] = message;
    }

    /**
     * Handle a field that must be set by the user
     * @param field
     * @param value
     * @param params
     * @returns {boolean}
     */
    private isRequired(field: string, value: string, params: string[]) {
        if (value == undefined) {
            return false;
        }

        if (value == "") {
            return false;
        }

        return true;
    }

    /**
     * Handle a field that must be a valid email
     * @param field
     * @param value
     * @param params
     * @returns {boolean}
     */
    private isEmail(field: string, value: string, params: string[]) {
        return validator.isEmail(value);
    }

    /**
     * Handle a field that must be confirmed by another (password confirmation)
     * @param field
     * @param value
     * @param params
     * @returns {boolean}
     */
    private isConfirmed(field: string, value: string, params: string[]) {
        var value_confirmation = this.request.post(field+"_conf");
        return value == value_confirmation;
    }

    /**
     * Handle a field that must be inside some values
     * @param field
     * @param value
     * @param params
     * @returns {boolean}
     */
    private isIn(field: string, value: string, params: string[]) {
        return validator.isIn(value, params)
    }
}