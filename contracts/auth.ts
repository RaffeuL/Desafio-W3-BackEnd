/**
 * Contract source: https://git.io/JOdz5
 *
 * Feel free to let us know via PR, if you find something broken in this
 * file.
 */

import Buyer from 'App/Models/Buyer'
import Courier from 'App/Models/Courier'

declare module '@ioc:Adonis/Addons/Auth' {
  /*
  |--------------------------------------------------------------------------
  | Providers
  |--------------------------------------------------------------------------
  |
  | The providers are used to fetch users. The Auth module comes pre-bundled
  | with two providers that are `Lucid` and `Database`. Both uses database
  | to fetch user details.
  |
  | You can also create and register your own custom providers.
  |
  */
  interface ProvidersList {
    /*
    |--------------------------------------------------------------------------
    | User Provider
    |--------------------------------------------------------------------------
    |
    | The following provider uses Lucid models as a driver for fetching user
    | details from the database for authentication.
    |
    | You can create multiple providers using the same underlying driver with
    | different Lucid models.
    |
    */
    buyer: {
      implementation: LucidProviderContract<typeof Buyer>
      config: LucidProviderConfig<typeof Buyer>
    }

    courier: {
      implementation: LucidProviderContract<typeof Courier>
      config: LucidProviderConfig<typeof Courier>
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Guards
  |--------------------------------------------------------------------------
  |
  | The guards are used for authenticating users using different drivers.
  | The auth module comes with 3 different guards.
  |
  | - SessionGuardContract
  | - BasicAuthGuardContract
  | - OATGuardContract ( Opaque access token )
  |
  | Every guard needs a provider for looking up users from the database.
  |
  */
  interface GuardsList {
    /*
    |--------------------------------------------------------------------------
    | OAT Guard
    |--------------------------------------------------------------------------
    |
    | OAT, stands for (Opaque access tokens) guard uses database backed tokens
    | to authenticate requests.
    |
    */
    buyer: {
      implementation: OATGuardContract<'buyer', 'buyer'>
      config: OATGuardConfig<'buyer'>
      client: OATClientContract<'buyer'>
    }

    courier: {
      implementation: OATGuardContract<'courier', 'courier'>
      config: OATGuardConfig<'courier'>
      client: OATClientContract<'courier'>
    }
  }
}
