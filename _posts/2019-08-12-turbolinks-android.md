---
layout: post
title: Turbolinks Android Adaptörü Kullanımı - Rails
subtitle: Turbolinks android adaptörünü kullanarak native hissiyat veren bir android aplikasyonu yapıyoruz.
bigimg: /img/farzad-nazifi-p-xSl33Wxyc-unsplash.jpg
tags: [ruby-on-rails, turbolinks, android]
---

### Şöyle Hızlıca Bir Başlangıç

#### Turbolinks de ne ola ?

Turbolinks, web'de gezinmeyi hızlandıran bir javascript kütüphanesidir.
Bunu, yeni bir linke gidildiğinde sadece body ve title'ı güncelleyerek yapar.
Rails ekosistemi için çok önemli bir yere sahiptir.

#### Tamam da android ne alaka ?

Turbolinks'in bu davranışı sadece webde değil, mobil uygulamalarda da inanılmaz bir performans artışı sağlar.
Rails geliştiricileri halihazırda geliştirmiş oldukları web sitelerini turbolinks adaptörleri sayesinde mobil cihazlara da uygulayabilirler.

Şimdilik sadece [turbolinks-ios](https://github.com/turbolinks/turbolinks-ios) ve [turbolinks-android](https://github.com/turbolinks/turbolinks-android) adaptörleri bulunmakta.

**Turbolinks android adaptörü şu an geliştırilmemektedir. Geliştiricileri şu an 2.0 versiyonunu hazırlamakta. [bknz.](https://github.com/turbolinks/turbolinks-android/issues/110#issuecomment-508091299)**

Şu an deprecate olması işlevsel olmadığı anlamına gelmemekte bilakis basecamp 3 uygulaması hala turbolinks-android ile harikalar yaratmakta.

### Hazırlık

#### Gereksinimler

* Sağlıkı bir rails geliştirme ortamı (rbenv, ruby, bundler, rails ...)
* Android Studio

### Uygulamaların İlklendirilmesi

#### Rails Uygulaması

Konumuz rails olmadığı için geçiyorum. Rails 5 veya 6 kullanıyorsanız zaten turbolnks kullanıyorsunuz demektir. Onun haricinde gerekli kurulum bilgilerini [turbolinks](https://github.com/turbolinks/turbolinks) reposundan alabilirsiniz.
Ben bu yazıda MIT lisansıyla geliştirmekte olduğum [groupath](https://github.com/yunusemredilber/groupath) projemi kullanacağım, çünkü işimiz sadece android tarafında olacak.

#### Android Projesi

İşe Empty Activity'i seçerek bir android projesi oluşturmakla başlayalım.

<p align="center"> 
  <img src="/img/turbolinks-android/turbolinks-android-1.png" alt="Projeyi oluşturma">
</p>

Projeyi oluştururken isim vermeyi ve **Minimum API Levelini 19 yapmayı** unutmayalım.
Turbolinks android adaptörü Android 4.4 öncesini desteklemiyor.

<p align="center"> 
  <img src="/img/turbolinks-android/turbolinks-android-2.png" alt="Projeyi oluşturmayı tamamlama">
</p>

### Geliştirmeye başlama

Aslında yapacağımız iş oldukca kolay.
4-5 adımda bitecek bir iş. Şimdi adım adım yapalım.

#### 1. Bağımlılıkları ayarlama

En büyük sıkıntıyı çektiğimiz kısım burası.
Çünkü zaman geçtikçe bağımlı uygulamalar değişiyor, farklı paketlere geçiyor veya komple siliniyor.
Bu yüzden bu adımın güncel olması gerekiyor. Bu yazıyı yayımladığım 2019-08-14 tarihi ile tüm bağımlılıklar çalışır halde ve günceldir.
Ayrıca güncel tutmaya çalışacağım.

`build.gradle` dosyamızdaki ( uygulamanın, projenin değil! ) dependencieslere eklememiz gereken 3 _implementasyon_ var:

```bash
implementation 'com.basecamp:turbolinks:1.0.9' // Turbolinks
implementation 'com.google.code.gson:gson:2.8.2' // Important addition 1
implementation 'org.apache.commons:commons-lang3:3.1' // Important addition 2
```

Dosyanın tam haline [bu gist](https://gist.github.com/yunusemredilber/e55ce3e00a18cf29ddfa6da4b6723044) ten ulaşabilirsiniz.

Bundan sonra `Build > Rebuild Project` diyip *Build completed successfully* şeklinde bir çıktı almanız gerekiyor.

#### 2. activity_main.xml Ayarı

Bu dosyayı direk orijinal turbolinks-android reposundaki örnek uygulamadan çekebiliriz.

[activity_main.xml](https://github.com/turbolinks/turbolinks-android/blob/master/demoapp/src/main/res/layout/activity_main.xml)

`app/res/layout/activity_main.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <com.basecamp.turbolinks.TurbolinksView
        android:id="@+id/turbolinks_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>

</LinearLayout>
```

#### 3. Internete erişim izini verme

Bunun için `app/manifests/AndroidManifest.xml` dosyasında, manifest tagının içine aşağıdaki satırı eklememiz yeterlidir.

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

#### 4. MainActivity.java Ayarı

Bunun için de turbolinks-android reposundaki örnek uygulamayı baz alabiliriz.

[MainActivity.java](https://github.com/turbolinks/turbolinks-android/blob/master/demoapp/src/main/java/com/basecamp/turbolinks/demo/MainActivity.java)

`app/java/com.example.turbolinksapp/MainActivity.java` (com.example.turbolinksapp kısmı uygulamaya verdiğiniz isime göre değişebilir.)

**En üstte bulunan `package com.example.turbolinksapp;` tarzı kodu lütfen değiştirmeyin.**

**118 satırlık kodu buraya yazmak mantıksız olacağından, kodu sadece örnek oluşturması amacıyla KIRPARAK veriyorum. Lütfen [buradan](https://github.com/turbolinks/turbolinks-android/blob/master/demoapp/src/main/java/com/basecamp/turbolinks/demo/MainActivity.java) kopyalayarak kodunuzu düzenleyin.**

```java
package com.example.turbolinksapp;

import android.content.Intent;
import android.os.Bundle;
// ...

public class MainActivity extends AppCompatActivity implements TurbolinksAdapter {
    
    private static final String BASE_URL = "https://groupathx.herokuapp.com";
    private static final String INTENT_URL = "intentUrl";

    private String location;
    private TurbolinksView turbolinksView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // ...
    }

    // ...
    
}

```

#### 5. Turbolinks kullanan sitenizin adresini girin

Kısaca MainActivity classının BASE_URL değişkeninin değerini, uygulamanızın adresiyle değiştirin.

```java
public class MainActivity extends AppCompatActivity implements TurbolinksAdapter {
    // Change the BASE_URL to an address that your VM or device can hit.
    private static final String BASE_URL = "https://groupathx.herokuapp.com";
    private static final String INTENT_URL = "intentUrl";
    // ...
}
```

Başlangıçtada bahsettiğim gibi `groupath` uygulamamın adresini verdim.

Ve Sonuç :)

<p align="center"> 
  <img src="/img/turbolinks-android/turbolinks-android-3.jpg" alt="Uygulamanın çalışır hali">
</p>

### Uygulamayı configüre etme

Turbolinks Android bize webviewin tam kontrolünü vermektedir. Bu webview'a `TurbolinksSession.getDefault(this).getWebView()` şeklinde ulaşabiliriz.


#### UserAgent

Uygulamamıza özel user-agent setleyerek daha farklı viewlar göstermek gibi uygulamaya özel işler yapabiliriz.
Buna en yaygın örnek, websitesinin navbarını render etmeyip, uygulama içinde native bi navigasyon göstermek olabilir.

```java
// Set UserAgent
TurbolinksSession.getDefault(this).getWebView().getSettings().setUserAgentString("AndroidApp");
```

#### ProgressView

Sayfalar arası geçiş için gelen ProgressView ekranını özelleştirebiliyoruz. Bunun için aşağıdaki adımları takip edebilirz:

##### 1. ActivityMain.xml Güncelleme

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <FrameLayout
        android:id="@+id/frameLayout"
        android:layout_width="fill_parent"
        android:layout_height="fill_parent"
        android:background="#fff">

        <ProgressBar
            android:id="@+id/indeterminateBar"
        />
    </FrameLayout>

    <com.basecamp.turbolinks.TurbolinksView
        android:id="@+id/turbolinks_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>


</LinearLayout>
```

Artık burada kullandığımız ProgressBar'ı istediğimiz gibi değiştirebiliriz.

##### 2. MainActivity.java Güncelleme

```java
// ...

import android.view.View; // Add this line

public class MainActivity extends AppCompatActivity implements TurbolinksAdapter {
    // ...

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // ...

        View progressView = (View) findViewById(R.id.frameLayout); // Add this line
        TurbolinksSession.getDefault(this)
                .activity(this)
                .adapter(this)
                .view(turbolinksView)
                .progressView(progressView, R.id.indeterminateBar, 500) // Add this line
                .visit(location);
    }

    // ...
}

```

Kullandığımız progressView methodundaki 500 parametresi, ms biçiminden progressBar'ın aktive edilme süresidir.

#### Hataları handle etme

MainActivity'deki handleError methodu ile hataları handle edebiliriz.
Hata oluştuğnda bu method, hata kodu ile birlite tetiklenir.
Örnek olarak internet yokken istek atıldığında bu method 0 koduyla tetiklenir.
Biz de kullanıcıya "internet bağlı değil" gibi native bir çıktı sunabiliriz.

#### Pathleri kotrol etme

Sayfada turbolinks'i aktif bir linke tıkladığımızda tetiklenen method `visitProposedToLocationWithAction` dır.
Artık biz de burada yeni bir intent üretip, gidilecek konumu vererek intenti başlatırız.

Ayrıca burada, gidilecek konumu kontrol etmek, ürettiğimiz daha farklı bir intentde sayfayı açmak gibi advanced şeyler yapabiliriz.






> Photo by Farzad Nazifi on Unsplash