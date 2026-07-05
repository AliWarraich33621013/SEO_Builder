"use client";

// src/components/admin/AiAssistantPanel.tsx
import { useCallback, useEffect, useState } from "react";
import { useForm, useFormFields } from "@payloadcms/ui";
import { jsx, jsxs } from "react/jsx-runtime";
function extractTextFromContent(content) {
  if (!content) return "";
  if (typeof content === "string") return content;
  try {
    const json = typeof content === "object" ? content : JSON.parse(String(content));
    const texts = [];
    const walk = (node) => {
      if (!node || typeof node !== "object") return;
      const n = node;
      if (typeof n.text === "string") texts.push(n.text);
      if (Array.isArray(n.children)) n.children.forEach(walk);
      if (Array.isArray(n.root)) n.root.forEach(walk);
      if (n.root && typeof n.root === "object") walk(n.root);
    };
    walk(json);
    return texts.join(" ");
  } catch {
    return "";
  }
}
function formatOutline(outline) {
  const lines = [];
  if (outline.h1) lines.push(`H1: ${outline.h1}`);
  if (outline.introAngle) lines.push(`
Intro angle: ${outline.introAngle}`);
  if (outline.structure?.length) {
    lines.push("\nStructure:");
    outline.structure.forEach((s) => {
      lines.push(`- ${s.heading}`);
      s.subheadings?.forEach((sub) => lines.push(`  - ${sub}`));
    });
  }
  if (outline.faqSuggestions?.length) {
    lines.push("\nFAQ suggestions:");
    outline.faqSuggestions.forEach((q) => lines.push(`- ${q}`));
  }
  if (outline.ctaSuggestion) lines.push(`
CTA: ${outline.ctaSuggestion}`);
  return lines.join("\n");
}
function formatSocial(data) {
  return [
    data.linkedin && `LinkedIn:
${data.linkedin}`,
    data.twitter && `Twitter/X:
${data.twitter}`,
    data.facebook && `Facebook:
${data.facebook}`
  ].filter(Boolean).join("\n\n");
}
async function postApi(endpoint, body) {
  const res = await fetch(`/api/seo-builder/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error(`Request failed (${res.status}). Check server logs and AI provider configuration.`);
  }
  if (!json.success) {
    const err = json;
    throw new Error(err.error?.message || `Request failed (${res.status})`);
  }
  return json;
}
var panelStyle = {
  border: "1px solid var(--theme-elevation-150)",
  borderRadius: "var(--style-radius-m)",
  padding: "1.25rem",
  background: "var(--theme-elevation-50)"
};
var badgeStyle = {
  display: "inline-block",
  padding: "0.25rem 0.6rem",
  borderRadius: "var(--style-radius-s)",
  background: "var(--theme-elevation-100)",
  fontSize: "0.8rem",
  marginBottom: "1rem"
};
var buttonStyle = {
  margin: "0.25rem",
  padding: "0.45rem 0.75rem",
  fontSize: "0.85rem",
  cursor: "pointer",
  border: "1px solid var(--theme-elevation-200)",
  borderRadius: "var(--style-radius-s)",
  background: "var(--theme-elevation-0)"
};
var cardStyle = {
  border: "1px solid var(--theme-elevation-150)",
  borderRadius: "var(--style-radius-s)",
  padding: "0.75rem",
  marginTop: "0.5rem",
  background: "var(--theme-elevation-0)",
  whiteSpace: "pre-wrap",
  fontSize: "0.9rem"
};
var AiAssistantPanel = () => {
  const { dispatchFields, setModified } = useForm();
  const formValues = useFormFields(([fields]) => ({
    title: fields.title?.value || "",
    excerpt: fields.excerpt?.value || "",
    content: fields.content?.value,
    focusKeyword: fields.focusKeyword?.value || "",
    metaTitle: fields.metaTitle?.value || "",
    metaDescription: fields.metaDescription?.value || "",
    slug: fields.slug?.value || ""
  }));
  const [providerInfo, setProviderInfo] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  useEffect(() => {
    fetch("/api/seo-builder/provider-info").then((r) => r.json()).then((json) => {
      if (json.success && json.data) setProviderInfo(json.data);
    }).catch(() => {
    });
  }, []);
  const applyField = useCallback(
    (path, value) => {
      dispatchFields({ type: "UPDATE", path, value });
      setModified(true);
    },
    [dispatchFields, setModified]
  );
  const addResults = useCallback((items) => {
    setResults(items.map((item, i) => ({ ...item, id: `${Date.now()}-${i}` })));
  }, []);
  const runAction = useCallback(
    async (actionId, fn) => {
      setLoading(actionId);
      setError(null);
      try {
        await fn();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(null);
      }
    },
    []
  );
  const topic = formValues.title || "Untitled post";
  const focusKeyword = formValues.focusKeyword;
  const contentText = extractTextFromContent(formValues.content);
  const requireKeyword = () => {
    if (!focusKeyword.trim()) {
      setError("Set a focus keyword in the SEO tab first.");
      return false;
    }
    return true;
  };
  const saveSuggestions = () => {
    if (results.length === 0) return;
    const payload = results.map(({ label, content }) => ({ label, content }));
    applyField("aiSuggestions", payload);
  };
  return /* @__PURE__ */ jsxs("div", { style: panelStyle, children: [
    /* @__PURE__ */ jsx("h3", { style: { margin: "0 0 0.5rem", fontSize: "1.1rem" }, children: "SEO Builder AI Assistant" }),
    /* @__PURE__ */ jsx("p", { style: { margin: "0 0 1rem", color: "var(--theme-elevation-800)", fontSize: "0.9rem" }, children: "Generate SEO content suggestions. Review results, then copy or apply to fields. Save the document when you are ready \u2014 nothing is auto-saved." }),
    providerInfo && /* @__PURE__ */ jsxs("div", { style: badgeStyle, children: [
      "Using ",
      providerInfo.provider.charAt(0).toUpperCase() + providerInfo.provider.slice(1),
      " (",
      providerInfo.model,
      ")"
    ] }),
    error && /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          ...cardStyle,
          borderColor: "var(--theme-error-500)",
          color: "var(--theme-error-500)"
        },
        children: error
      }
    ),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.25rem", marginBottom: "1rem" }, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          style: buttonStyle,
          disabled: !!loading,
          onClick: () => runAction("titles", async () => {
            if (!requireKeyword()) return;
            const res = await postApi("generate-title", {
              topic,
              focusKeyword
            });
            addResults(
              (res.data.titles || []).map((t, i) => ({
                id: `title-${i}`,
                label: `Title option ${i + 1}`,
                content: t,
                applyField: "title",
                applyValue: t
              }))
            );
          }),
          children: loading === "titles" ? "Generating\u2026" : "Generate titles"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          style: buttonStyle,
          disabled: !!loading,
          onClick: () => runAction("outline", async () => {
            if (!requireKeyword()) return;
            const res = await postApi("generate-outline", {
              topic,
              focusKeyword
            });
            const text = formatOutline(res.data);
            addResults([{ id: "outline", label: "Content outline", content: text }]);
          }),
          children: loading === "outline" ? "Generating\u2026" : "Generate outline"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          style: buttonStyle,
          disabled: !!loading,
          onClick: () => runAction("meta-title", async () => {
            if (!requireKeyword()) return;
            const res = await postApi("generate-meta-title", {
              postTitle: topic,
              focusKeyword
            });
            addResults(
              (res.data.suggestions || []).map((t, i) => ({
                id: `meta-title-${i}`,
                label: `Meta title ${i + 1}`,
                content: t,
                applyField: "metaTitle",
                applyValue: t
              }))
            );
          }),
          children: loading === "meta-title" ? "Generating\u2026" : "Meta title"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          style: buttonStyle,
          disabled: !!loading,
          onClick: () => runAction("meta-desc", async () => {
            if (!requireKeyword()) return;
            const res = await postApi("generate-meta-description", {
              postTitle: topic,
              focusKeyword,
              excerpt: formValues.excerpt,
              content: contentText
            });
            addResults(
              (res.data.suggestions || []).map((t, i) => ({
                id: `meta-desc-${i}`,
                label: `Meta description ${i + 1}`,
                content: t,
                applyField: "metaDescription",
                applyValue: t
              }))
            );
          }),
          children: loading === "meta-desc" ? "Generating\u2026" : "Meta description"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          style: buttonStyle,
          disabled: !!loading,
          onClick: () => runAction("slug", async () => {
            const res = await postApi("generate-slug", {
              postTitle: topic,
              focusKeyword: focusKeyword || void 0
            });
            const slug = res.data.slug;
            addResults([
              {
                id: "slug",
                label: "Suggested slug",
                content: slug,
                applyField: "slug",
                applyValue: slug
              }
            ]);
          }),
          children: loading === "slug" ? "Generating\u2026" : "Generate slug"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          style: buttonStyle,
          disabled: !!loading,
          onClick: () => runAction("faq", async () => {
            if (!requireKeyword()) return;
            const res = await postApi(
              "generate-faq",
              {
                postTitle: topic,
                focusKeyword,
                content: contentText
              }
            );
            const faqs = res.data.faqs || [];
            const text = faqs.map((f) => `Q: ${f.question}
A: ${f.answer}`).join("\n\n");
            addResults([
              {
                id: "faq",
                label: "FAQ suggestions",
                content: text,
                applyField: "faqItems",
                applyValue: faqs
              }
            ]);
          }),
          children: loading === "faq" ? "Generating\u2026" : "Generate FAQ"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          style: buttonStyle,
          disabled: !!loading,
          onClick: () => runAction("excerpt", async () => {
            if (!requireKeyword()) return;
            const res = await postApi("generate-excerpt", {
              postTitle: topic,
              focusKeyword,
              content: contentText
            });
            addResults(
              (res.data.excerpts || []).map((t, i) => ({
                id: `excerpt-${i}`,
                label: `Excerpt ${i + 1}`,
                content: t,
                applyField: "excerpt",
                applyValue: t
              }))
            );
          }),
          children: loading === "excerpt" ? "Generating\u2026" : "Generate excerpt"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          style: buttonStyle,
          disabled: !!loading,
          onClick: () => runAction("social", async () => {
            const res = await postApi(
              "generate-social-captions",
              {
                postTitle: topic,
                excerpt: formValues.excerpt,
                content: contentText
              }
            );
            addResults([
              {
                id: "social",
                label: "Social captions",
                content: formatSocial(res.data)
              }
            ]);
          }),
          children: loading === "social" ? "Generating\u2026" : "Social captions"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          style: buttonStyle,
          disabled: !!loading,
          onClick: () => runAction("readability", async () => {
            const source = contentText || formValues.excerpt;
            if (!source.trim()) {
              setError("Add content or an excerpt to improve readability.");
              return;
            }
            const res = await postApi(
              "improve-readability",
              {
                content: source,
                focusKeyword: focusKeyword || void 0
              }
            );
            addResults([
              {
                id: "readability",
                label: "Improved text",
                content: `${res.data.improvedText}

---
Changes: ${res.data.changesSummary}`,
                applyField: "excerpt",
                applyValue: res.data.improvedText
              }
            ]);
          }),
          children: loading === "readability" ? "Generating\u2026" : "Improve readability"
        }
      )
    ] }),
    results.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
        /* @__PURE__ */ jsx("strong", { children: "Results" }),
        /* @__PURE__ */ jsx("button", { type: "button", style: buttonStyle, onClick: saveSuggestions, children: "Save suggestions to JSON field" })
      ] }),
      results.map((item) => /* @__PURE__ */ jsxs("div", { style: cardStyle, children: [
        /* @__PURE__ */ jsx("div", { style: { fontWeight: 600, marginBottom: "0.35rem" }, children: item.label }),
        /* @__PURE__ */ jsx("div", { children: item.content }),
        /* @__PURE__ */ jsxs("div", { style: { marginTop: "0.5rem", display: "flex", gap: "0.5rem" }, children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              style: buttonStyle,
              onClick: () => navigator.clipboard.writeText(item.content),
              children: "Copy"
            }
          ),
          item.applyField && /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              style: buttonStyle,
              onClick: () => applyField(item.applyField, item.applyValue ?? item.content),
              children: [
                "Apply to ",
                item.applyField
              ]
            }
          )
        ] })
      ] }, item.id))
    ] })
  ] });
};
export {
  AiAssistantPanel
};
//# sourceMappingURL=AiAssistantPanel.js.map