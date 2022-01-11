<template>
    <div>Callback</div>
</template>

<script lang="ts" setup>
    import { ThreefoldLogin, generateRandomString } from '@threefoldjimber/threefold_login/dist';

    const threeFoldAPIHost = 'https://login.threefold.me';
    const appId = window.location.host;
    const seedPhrase =
        'calm science teach foil burst until next mango hole sponsor fold bottom cousin push focus track truly tornado turtle over tornado teach large fiscal';
    const _redirectUrl = '/callback';

    console.log('seedPhrase: ', seedPhrase);
    const _login = new ThreefoldLogin(
        threeFoldAPIHost,
        appId,
        seedPhrase,
        _redirectUrl,
        'https://openkyc.live/verification/verify-sei'
    );
    await _login.init();

    const state = window.localStorage.getItem('state') as string;
    const redirectUrl = new URL(window.location.href);
    console.log(redirectUrl);
    try {
        const profileData = await _login.parseAndValidateRedirectUrl(redirectUrl, state);
        window.postMessage({ message: 'threefoldLoginRedirectSuccess', profileData: profileData });
        console.log('Profile Data', profileData);
        let profile = profileData;
        console.log('e.data.profileData: ', profileData);
        window.localStorage.setItem('profile', JSON.stringify(profileData));
        const sei = true;
        if (sei) {
            console.log('SEI. ', sei);
            let signedEmailIdentifier = await _login.verifySignedEmailIdenfier(sei);
            window.localStorage.setItem('signedEmailIdentifier', JSON.stringify(signedEmailIdentifier));
            console.log('signedEmailIdentifier: ', signedEmailIdentifier);
        }
        const spi = true;
        if (spi) {
            console.log('SPI. ', spi);
            let signedPhoneIdentifier = await _login.verifySignedPhoneIdenfier(spi);
            window.localStorage.setItem('signedPhoneIdentifier', JSON.stringify(signedPhoneIdentifier));
            console.log('signedPhoneIdentifier: ', signedPhoneIdentifier);
        }
    } catch (e) {
        console.error('Error', e);
    }
</script>
