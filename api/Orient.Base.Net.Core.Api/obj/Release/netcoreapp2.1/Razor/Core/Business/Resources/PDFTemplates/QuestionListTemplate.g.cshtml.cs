#pragma checksum "C:\Users\trinh.vo\Documents\InternDN_HRTools\api\Orient.Base.Net.Core.Api\Core\Business\Resources\PDFTemplates\QuestionListTemplate.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "b1091df4efc5ca2f9b56c9b1df1f60050904ced8"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Core_Business_Resources_PDFTemplates_QuestionListTemplate), @"mvc.1.0.view", @"/Core/Business/Resources/PDFTemplates/QuestionListTemplate.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Core/Business/Resources/PDFTemplates/QuestionListTemplate.cshtml", typeof(AspNetCore.Core_Business_Resources_PDFTemplates_QuestionListTemplate))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b1091df4efc5ca2f9b56c9b1df1f60050904ced8", @"/Core/Business/Resources/PDFTemplates/QuestionListTemplate.cshtml")]
    public class Core_Business_Resources_PDFTemplates_QuestionListTemplate : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<List<Orient.Base.Net.Core.Api.Core.Business.Models.Questions.QuestionAnswerPDFModel>>
    {
        #line hidden
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(93, 8, true);
            WriteLiteral("<html>\r\n");
            EndContext();
            BeginContext(101, 519, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "e9239a07344240feb280ddd924cf4ae3", async() => {
                BeginContext(107, 506, true);
                WriteLiteral(@"
    <style>
        .header {
            text-align: center;
            color: green;
            padding-bottom: 35px;
        }

        table {
            width: 80%;
            border-collapse: collapse;
        }

        td, th {
            border: 1px solid gray;
            padding: 15px;
            font-size: 22px;
            text-align: center;
        }

        table th {
            background-color: green;
            color: white;
        }
    </style>
");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(620, 2, true);
            WriteLiteral("\r\n");
            EndContext();
            BeginContext(622, 625, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "d0cf4e9d0b314233b290cd3d13f11680", async() => {
                BeginContext(628, 184, true);
                WriteLiteral("\r\n    <div class=\'header\'><h1>INTERVIEW QUESTION!!!</h1></div>\r\n    <table align=\'center\'>\r\n        <tr>\r\n            <th>Question</th>\r\n            <th>Answers</th>\r\n\r\n        </tr>\r\n");
                EndContext();
#line 37 "C:\Users\trinh.vo\Documents\InternDN_HRTools\api\Orient.Base.Net.Core.Api\Core\Business\Resources\PDFTemplates\QuestionListTemplate.cshtml"
         foreach (var question in Model)
        {

#line default
#line hidden
                BeginContext(865, 38, true);
                WriteLiteral("            <tr>\r\n                <td>");
                EndContext();
                BeginContext(904, 17, false);
#line 40 "C:\Users\trinh.vo\Documents\InternDN_HRTools\api\Orient.Base.Net.Core.Api\Core\Business\Resources\PDFTemplates\QuestionListTemplate.cshtml"
               Write(question.Question);

#line default
#line hidden
                EndContext();
                BeginContext(921, 7, true);
                WriteLiteral("</td>\r\n");
                EndContext();
#line 41 "C:\Users\trinh.vo\Documents\InternDN_HRTools\api\Orient.Base.Net.Core.Api\Core\Business\Resources\PDFTemplates\QuestionListTemplate.cshtml"
                 if (question.Answer == null)
                {

#line default
#line hidden
                BeginContext(994, 66, true);
                WriteLiteral("                    <td>Don\'t have answer for this question</td>\r\n");
                EndContext();
#line 44 "C:\Users\trinh.vo\Documents\InternDN_HRTools\api\Orient.Base.Net.Core.Api\Core\Business\Resources\PDFTemplates\QuestionListTemplate.cshtml"
                }
                else
                {

#line default
#line hidden
                BeginContext(1120, 24, true);
                WriteLiteral("                    <td>");
                EndContext();
                BeginContext(1145, 23, false);
#line 47 "C:\Users\trinh.vo\Documents\InternDN_HRTools\api\Orient.Base.Net.Core.Api\Core\Business\Resources\PDFTemplates\QuestionListTemplate.cshtml"
                   Write(question.Answer.Content);

#line default
#line hidden
                EndContext();
                BeginContext(1168, 7, true);
                WriteLiteral("</td>\r\n");
                EndContext();
#line 48 "C:\Users\trinh.vo\Documents\InternDN_HRTools\api\Orient.Base.Net.Core.Api\Core\Business\Resources\PDFTemplates\QuestionListTemplate.cshtml"
                }

#line default
#line hidden
                BeginContext(1194, 19, true);
                WriteLiteral("            </tr>\r\n");
                EndContext();
#line 50 "C:\Users\trinh.vo\Documents\InternDN_HRTools\api\Orient.Base.Net.Core.Api\Core\Business\Resources\PDFTemplates\QuestionListTemplate.cshtml"
        }

#line default
#line hidden
                BeginContext(1224, 16, true);
                WriteLiteral("\r\n    </table>\r\n");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(1247, 15, true);
            WriteLiteral("\r\n</html>\r\n\r\n\r\n");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<List<Orient.Base.Net.Core.Api.Core.Business.Models.Questions.QuestionAnswerPDFModel>> Html { get; private set; }
    }
}
#pragma warning restore 1591
