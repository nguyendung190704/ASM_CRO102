#pragma once

#include "winrt/Microsoft.ReactNative.h"

namespace winrt::PH35067_CRO101_ASSIGNMENT::implementation
{
    struct ReactPackageProvider : winrt::implements<ReactPackageProvider, winrt::Microsoft::ReactNative::IReactPackageProvider>
    {
    public: // IReactPackageProvider
        void CreatePackage(winrt::Microsoft::ReactNative::IReactPackageBuilder const &packageBuilder) noexcept;
    };
} // namespace winrt::PH35067_CRO101_ASSIGNMENT::implementation

