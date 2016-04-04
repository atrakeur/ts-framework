import {Application} from "./Application";

/**
 * Class ApplicationFactory
 * Used to create default applications, rendering 'Global.ts' useless (which has recursive <reference> tags)
 * The primary goal of this is to make creating applications easier and more elegant
 * 
 * @since 2016-04-04
 * @author Luke Paris (Paradoxis) <luke@paradoxis.nl>
 */
export class ApplicationFactory
{
    /**
     * Create a new application without any configuration
     * @param {string} root
     * @returns {Application}
     */
    public static create(root : string, config : FactoryConfig = null) : Application
    {
        // Intiialize a new application
        var app = new Application(root);
        
        // Configure the application
        app.configure(() => {
            
            // Add declaration file 
            if (config.declarationPath !== null) {
                app.addDeclaration(config.declarationPath);
            }
            
            // load config
            if (config.configPath !== null) {
                app.config.addJson('app.json');
            }

            // default routes
            if (config.addDefaultRoutes === true) {
                app.router.map('/', { controller: 'Index', action: 'index' });
                app.router.map('/:action', { controller: 'Index'});
                app.router.map('/:controller/:action?/:id?', { action: 'index' });
            }

            // REST routes
            if (config.addDefaultRestRoutes) {
                app.router.get('/:controller/:id?', { action: 'find' });
                app.router.post('/:controller', { action: 'create' });
                app.router.put('/:controller/:id', { action: 'update' });
                app.router.delete('/:controller/:id', { action: 'destroy' });
            }
        });
        
        // Return the initialized app
        return app;
    }
}

/**
 * Factory method configuration used in create()
 * 
 * @see ApplicationFactory#create()
 * @since 2016-04-04
 * @author Luke Paris (Paradoxis) <luke@paradoxis.nl>
 */
export class FactoryConfig
{
    public addDefaultRoutes : boolean= true;
    public addDefaultRestRoutes : boolean = true;
    
    public configPath : string = null;
    public declarationPath : string = null;
}