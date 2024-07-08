Imports System.Web
Imports System.Web.Optimization

Public Module BundleConfig
    ' Paketleme hakkında daha fazla bilgi için lütfen https://go.microsoft.com/fwlink/?LinkId=301862 adresini ziyaret edin.
    Public Sub RegisterBundles(ByVal bundles As BundleCollection)
        bundles.Add(New ScriptBundle("~/bundles/jquery").Include(
                   "~/Scripts/jquery-{version}.js"))

        ' Geliştirme yapmak ve öğrenmek için Modernizr'ın geliştirme sürümünü kullanın. Daha sonra,
        ' üretim için hazır. https://modernizr.com adresinde derleme aracını kullanarak yalnızca ihtiyacınız olan testleri seçin.
        bundles.Add(New ScriptBundle("~/bundles/modernizr").Include(
                    "~/Scripts/modernizr-*"))

        bundles.Add(New Bundle("~/bundles/bootstrap").Include(
                    "~/Scripts/bootstrap.js"))

        bundles.Add(New StyleBundle("~/Content/css").Include(
                    "~/Content/bootstrap.css",
                    "~/Content/site.css"))
    End Sub
End Module