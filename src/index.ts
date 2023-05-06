export {
  combinedDisposable,
  setUnexpectedErrorHandler,
  toDisposable,
  DisposableStore,
  Disposable,
  RefCountedDisposable,
  ImmortalReference,
  AsyncReferenceCollection,
  DisposableMap
} from './base'

export type {IDisposable, IReference} from './base'

export {
  SyncDescriptor
} from './instantiation/descriptors'

export {registerSingleton, getSingletonServiceDescriptors} from './instantiation/extensions'
export type {InstantiationType} from './instantiation/extensions'

export {createDecorator, refineServiceDecorator} from './instantiation/instantiation'
export type {BrandedService, IConstructorSignature, ServicesAccessor} from './instantiation/instantiation'

export {InstantiationService} from './instantiation/instantiationService'

export {ServiceCollection} from './instantiation/serviceCollection'
