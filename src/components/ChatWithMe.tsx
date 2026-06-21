import React, { useMemo, useState } from 'react';
import { Github, Linkedin, Mail, MessageCircle, Send, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { profileContact } from '@/data/profileContact';

const ChatWithMe = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent('Portfolio inquiry');
    const body = encodeURIComponent(message);
    return `mailto:${profileContact.email}?subject=${subject}&body=${body}`;
  }, [message]);

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-[min(calc(100vw-2.5rem),24rem)] overflow-hidden rounded-2xl border border-blue-400/20 bg-gray-950/90 shadow-[0_0_45px_rgba(59,130,246,0.22)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-[0_0_18px_rgba(139,92,246,0.35)]">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{t.chat.title}</h3>
                <p className="text-xs text-gray-400">{t.chat.subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
              aria-label={t.chat.close}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4 p-5">
            <p className="rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.04] p-4 text-sm leading-relaxed text-gray-300">
              {t.chat.intro}
            </p>

            <div className="grid grid-cols-3 gap-2">
              <a
                href={`mailto:${profileContact.email}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-black/30 p-3 text-xs font-medium text-gray-300 transition hover:border-blue-400/40 hover:text-white"
              >
                <Mail className="h-4 w-4 text-blue-300" />
                {t.chat.email}
              </a>
              <a
                href={profileContact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-black/30 p-3 text-xs font-medium text-gray-300 transition hover:border-blue-400/40 hover:text-white"
              >
                <Linkedin className="h-4 w-4 text-blue-300" />
                {t.chat.linkedin}
              </a>
              <a
                href={profileContact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-black/30 p-3 text-xs font-medium text-gray-300 transition hover:border-blue-400/40 hover:text-white"
              >
                <Github className="h-4 w-4 text-blue-300" />
                {t.chat.github}
              </a>
            </div>

            <label className="block text-xs font-semibold text-gray-400" htmlFor="chat-message">
              {t.chat.textareaLabel}
            </label>
            <textarea
              id="chat-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={t.chat.textareaPlaceholder}
              className="min-h-24 w-full resize-none rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-blue-400/50 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
            />
            <a
              href={mailtoHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(59,130,246,0.25)] transition hover:from-blue-500 hover:to-purple-500"
            >
              {t.chat.sendEmail}
              <Send className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="group inline-flex items-center gap-3 rounded-full border border-blue-400/25 bg-gray-950/80 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.28)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-blue-300/50"
        aria-expanded={isOpen}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-[0_0_18px_rgba(139,92,246,0.4)]">
          <MessageCircle className="h-5 w-5" />
        </span>
        <span className="hidden sm:inline">{t.chat.button}</span>
      </button>
    </div>
  );
};

export default ChatWithMe;
