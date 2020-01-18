---
layout: post
title: Rails Nested Forms
subtitle: Rails'in güzellilerinden nested formları ve accepts_nested_attributes_for'u gerçekleştirip güçlendireceğiz.
bigimg: /img/farzad-nazifi-p-xSl33Wxyc-unsplash.jpg
tags: [ruby-on-rails]
---

Nested formlar, önceden gördüğüm, ama pratikte hiç uygulamadığım bir konuydu.
Yakın zamanda, bulunduğum bir projede kullanma şansım oldu.
Uyguladıktan sonra gördüm ki, hem ortaya çıkan kod çok temiz oldu, hem de karşıma çıkmasından endişe ettiğim bir çok problem, kullandığım metodolojiden dolayı hiç var olamadı.
Sonuç olarak, hem kendim, hem de kafasını bir nebze de olsa açabileceğim insanlar için, bu yazıyı yazmaya karar verdim. Umarım keyifli bir yolculuk olur.

Hepimiz hazırsak, 'Course Management' isimli kurs yönetimi projemizi oluşturarak başlayalım:

```bash
rails new course_management
cd course_management
```

### Modellerin oluşturulması

İşimizi olabildiğince basit tutarak, iki adet model oluşturalım.
Bunlar Course ve Subject.
Kullanıcı kursu oluştuturken, kursun konularını da hızlıca eklemek isteyebilir.
Bu da bizi tam istedğimiz çıkmaza getiriyor.
`Daha oluşmamış Course modelimimz varken ona nasıl Subject ekleyebiliriz?`
Bu sorunun cevabını birazdan birlikte göreceğiz.
Şimdilik kendmizi bu konudan soyutlayıp modellerimizi oluşturalım.

```bash
rails g model Course title description:text
rails g model Subject course:references title description is_published:boolean
```

Modellerin aralarındaki işilkileri tanımlayıp, basit birkaç kontrol yazabiliriz:

```ruby
# app/models/course.rb
class Course < ApplicationRecord
  # Associations
  has_many :subjects, dependent: :destroy

  # Validations
  validates_presence_of :title, :description
end
```

```ruby
# app/models/subject.rb
class Subject < ApplicationRecord
  # Associations
  belongs_to :course

  # Validations
  validates_presence_of :title, :description
  validates :is_published, inclusion: { in: [true, false] }
end
```

Değişikliklerimizi veritabanımıza işlemeyi unutmayalım:

```bash
rails db:migrate
```

### Modellerin test edilmesi

Bu yazıyla pek alakası olmasa da, test yazmak yeterince önemsenmediği için bu başlığı buraya koymayı uygun gördüm.
Bir iki tane de olsa, test yazmak bize bir şey kaybettirmez.
Yinede, eğer isterseniz bu kısmı atlayabilirsiz.

```ruby
# test/models/course_test.rb
require 'test_helper'

class CourseTest < ActiveSupport::TestCase
  test 'course should be valid' do
    course = courses(:one)
    assert course
    course.subjects.delete_all
    assert course.valid?
  end

  test 'course should be invalid' do
    course = courses(:one)
    course.title = nil
    assert_not course.valid?
    course = courses(:two)
    course.description = nil
    assert_not course.valid?
  end
end
```

```ruby
# test/models/subject_test.rb
require 'test_helper'

class SubjectTest < ActiveSupport::TestCase
  test 'subject should be valid' do
    assert subjects(:one)
  end

  test 'subject should be invalid' do
    subject = subjects(:one)
    subject.title = nil
    assert_not subject.valid?
    subject = subjects(:two)
    subject.description = nil
    assert_not subject.valid?
  end

  test 'subject\'s is_published should be boolean' do
    subject = subjects(:one)
    subject.is_published = nil
    assert_not subject.valid?
    subject.is_published = false
    assert subject.valid?
  end

  test 'subject should have a course' do
    subject = Subject.new(title: 't', description: 'd', is_published: true)
    assert_not subject.valid?
    subject.course = courses(:one)
    assert subject.valid?
  end
end
```

Bundan sonra test komutumuzu çalıştırıp, modellerimizin istediğimiz gibi çalıştığından emin olabiliriz.

```bash
rails test
```

### accepts_nested_attributes_for kullanımı ve controllerın olışturuması

Artık asıl sorumuza geçebiliriz.
`Daha oluşmamış Course modelimimz varken ona nasıl Subject ekleyebiliriz?`
Bu sorunn cevabını rails bize [Building Complex Forms](https://guides.rubyonrails.org/form_helpers.html#building-complex-forms "Rails Guides") kısmında veriyor.
Birbirleri arasında one-to-one veya one-to-many ilişki bulunduran modeller arasında, iç içe geçmiş formlar kullanarak, aynı anda birden fazla işikili modeli oluşturabilir ve güncelleyebilir, hatta silebiliriz.
Şimdi biz de, burdaki işlemleri kendi senaryomuzda uygulayalım.
Öncelikle course modelimize, artık subject modeli için değerler alabilceğini söyleyelim:

```ruby
# app/models/course.rb
class Course < ApplicationRecord
  # Associations
  has_many :subjects, dependent: :destroy, inverse_of: :course
  accepts_nested_attributes_for :subjects

  # Validations
  validates_presence_of :title, :description
end
```

Burada eklediğimiz `accepts_nested_attributes_for :subjects` satırı bize, subject modeli için nested parametreler alabileceğimizi gösteriyor.
`inverse_of: :course` kısmı içinse basitçe, yaşayabilceğimiz karışıklıkları önlemek için bir önlem diyebiliriz.
inverse_of hakkında güzel bir örneği [Bi-directional Associations](https://guides.rubyonrails.org/association_basics.html#bi-directional-associations "Rails Guides") kısmında bulabilirsiniz.

Model kısmında işimiz bittiğine göre, controllerımızı oluşturarak işe başlayalım:

```ruby

```

**Yazım süreci hala devam etmekte...**



