import {ServiceProvider} from "../Core/ServiceProvider";
import {Lang} from "./Lang";
import FactoryMethod = Huject.FactoryMethod;

export class LangServiceProvider extends ServiceProvider {

    boot(container:Huject.Container) {
        container.register("Lang", Lang).as(FactoryMethod.SINGLETON);
    }

    start(container:Huject.Container) {
        var lang: Lang = container.resolve("Lang");
        lang.loadLanguage("en");
        lang.setLanguage("en");
    }

}
