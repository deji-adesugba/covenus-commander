"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DependenciesScanner = require("./scanner").DependenciesScanner;
const InstanceLoader = require("./injector/instance-loader").InstanceLoader;
const CovenContainer = require("./injector/container").CovenContainer;
const ExceptionsZone = require("./errors/exceptions-zone").ExceptionsZone;
const Common = require("../common/index");
const Logger = Common.Logger;
const CovenEnvironment = Common.CovenEnvironment;
const core_constants = require("./constants");
const CovenCliApplication = require("./coven-application").CovenCliApplication;
const type_check = require("../common/utils/type-check.utils");

class CovenFactory {
    static createCLI(cliProgram) {
        var instance = null;
        ExceptionsZone.run(() => {
            this.initialize(cliProgram);
            instance = this.createCovenInstance(new CovenCliApplication(this.container));
        });
        
        return instance ? instance : {run: ()=>{}};
    }
   
    static createCovenInstance(appInstance) {
        const proxy = this.createProxy(appInstance);
        proxy.setup();
        return proxy;
    }
    static initialize(cliProgram) {
        this.logger.log(core_constants.messages.CLI_APP_START);
        this.dependenciesScanner.scan(cliProgram);
        this.instanceLoader.createInstancesOfDependencies();
    }
    static createProxy(appInstance) {
        const appProxy = this.createExceptionProxy();
        return new Proxy(appInstance, {
            get: appProxy,
            set: appProxy,
        });
    }
    static createExceptionProxy() {
        return (appInstance, prop) => {
            if (!(prop in appInstance))
                return;
            var instance_member = appInstance[prop];
            if (type_check.isFunction(instance_member)) {
                return (...args) => {
                    let result;
                    let ifRunCallback = (instance_member.name == 'run') && type_check.isFunction(args[0]);

                    ExceptionsZone.run(() => {
                        result = appInstance[prop](...args);
                    }, ifRunCallback ? args[0] : null);
                    return result;
                };
            }
            return instance_member;
        };
    }

    static switchToDevelopmentMode(){
        Logger.setMode(CovenEnvironment.DEVELOPMENT);
    }

    static switchBackToTestMode(){
        Logger.setMode(CovenEnvironment.DEVELOPMENT);
    }
}
CovenFactory.container = new CovenContainer();
CovenFactory.dependenciesScanner = new DependenciesScanner(CovenFactory.container);
CovenFactory.instanceLoader = new InstanceLoader(CovenFactory.container);
CovenFactory.logger = new Logger(CovenFactory.name);

exports.CovenFactory = CovenFactory;
