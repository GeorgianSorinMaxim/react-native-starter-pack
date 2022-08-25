#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>

#import <CodePush/CodePush.h>

@import Firebase;

#if RCT_DEV
#import <React/RCTDevLoadingView.h>
#endif

#ifdef FB_SONARKIT_ENABLED && __has_include(<FlipperKit/FlipperClient.h>)
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  #ifdef FB_SONARKIT_ENABLED
    InitializeFlipper(application);
  #endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];

  #if RCT_DEV
    [bridge moduleForClass:[RCTDevLoadingView class]];
  #endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"Apply" initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  NSString *firebaseConfig = [[NSBundle mainBundle] pathForResource: @"GoogleService-Info" ofType: @"plist"];

  NSString *bundleId = [[NSBundle mainBundle] bundleIdentifier];
  NSLog(@"%@", @"** bundleId **");
  NSLog(@"%@", bundleId);
  if([bundleId isEqualToString:@"com.mindfulchef.MindfulChef.uat"]) {
    firebaseConfig = [[NSBundle mainBundle] pathForResource: @"GoogleService-Info-Dev" ofType: @"plist"];
  }
  NSLog(@"%@", @"** firebaseConfig **");
  NSLog(@"%@", firebaseConfig);

  FIROptions *options = [[FIROptions alloc] initWithContentsOfFile:firebaseConfig];
  [FIRApp configureWithOptions:options];

  // Force a test crash
  // @[][1];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];

#else
  return [CodePush bundleURL];
#endif
}

- (BOOL)application:(UIApplication *)application
   continueUserActivity:(nonnull NSUserActivity *)userActivity
   restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
}

@end
