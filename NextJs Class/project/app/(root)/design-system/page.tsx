import Theme from "@/components/navigation/navbar/Theme";

const DesignSystem = () => {
  return (
    <div className="min-h-screen bg-background p-8 md:p-16 transition-colors duration-500">
      <div className="max-w-5xl mx-auto space-y-20">
        {/* --- Header --- */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold font-heading text-foreground tracking-tight">
              Design <span className="text-primary italic">System</span>
            </h1>
            <p className="text-xl text-muted-foreground font-body max-w-2xl leading-relaxed">
              A premium, professional visual language built with Outfit & Inter.
              Designed for clarity, performance, and aesthetic excellence.
            </p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-card border border-border/50 rounded-2xl shadow-sm">
            <span className="text-sm font-semibold font-heading text-muted-foreground">
              Toggle Theme
            </span>
            <Theme />
          </div>
        </section>

        {/* --- Typography Section --- */}
        <section className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border/50" />
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground font-heading">
              Typography
            </h2>
            <div className="h-px flex-1 bg-border/50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <span className="text-xs font-bold text-primary uppercase">
                Heading / Outfit
              </span>
              <div className="space-y-4">
                <h1 className="text-6xl font-bold font-heading">H1 Heading</h1>
                <h2 className="text-4xl font-bold font-heading">H2 Heading</h2>
                <h3 className="text-2xl font-bold font-heading">H3 Heading</h3>
                <p className="font-heading text-lg">
                  Outfit is geometric, modern, and high-end. Perfect for
                  grabbing attention.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-xs font-bold text-primary uppercase">
                Body / Inter
              </span>
              <div className="space-y-4">
                <p className="text-base font-body leading-relaxed text-foreground">
                  Inter is the standard for modern UI. It excels in readability
                  and neutrality, allowing your content to shine without
                  distraction.
                </p>
                <p className="text-sm font-body text-muted-foreground leading-relaxed">
                  This is secondary text, using a muted color to create visual
                  hierarchy. It remains crisp and legible even at smaller sizes.
                </p>
                <div className="font-body font-bold italic">
                  Bold and Italic variants for emphasis.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Colors Section --- */}
        <section className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border/50" />
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground font-heading">
              Color Palette
            </h2>
            <div className="h-px flex-1 bg-border/50" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch
              name="Primary"
              color="bg-primary"
              text="text-primary-foreground"
              label="Brand Core"
            />
            <ColorSwatch
              name="Secondary"
              color="bg-secondary"
              text="text-secondary-foreground"
              label="UI Elements"
            />
            <ColorSwatch
              name="Base"
              color="bg-background"
              text="text-foreground"
              label="Background"
              border
            />
            <ColorSwatch
              name="Card"
              color="bg-card"
              text="text-card-foreground"
              label="Surfaces"
              border
            />
            <ColorSwatch
              name="Muted"
              color="bg-muted"
              text="text-muted-foreground"
              label="Low Priority"
            />
            <ColorSwatch
              name="Accent"
              color="bg-accent"
              text="text-accent-foreground"
              label="Highlights"
            />
            <ColorSwatch
              name="Border"
              color="bg-border"
              text="text-foreground"
              label="Dividers"
            />
            <ColorSwatch
              name="Destructive"
              color="bg-destructive"
              text="text-destructive-foreground"
              label="Critical"
            />
          </div>
        </section>

        {/* --- Buttons / Interactive Section --- */}
        <section className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border/50" />
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground font-heading">
              Interactive States
            </h2>
            <div className="h-px flex-1 bg-border/50" />
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
              Primary Button
            </button>
            <button className="px-8 py-3 border border-border bg-transparent text-foreground font-bold rounded-xl transition-all hover:bg-secondary hover:border-primary/50">
              Secondary
            </button>
            <button className="px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl transition-all hover:bg-secondary/80">
              Ghost Style
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

const ColorSwatch = ({ name, color, text, label, border = false }: any) => (
  <div
    className={`p-6 rounded-2xl flex flex-col gap-8 transition-transform hover:scale-105 ${color} ${text} ${
      border ? "border border-border/50" : ""
    }`}
  >
    <div className="space-y-1">
      <p className="font-heading font-bold">{name}</p>
      <p className="text-[10px] uppercase font-bold opacity-60 tracking-widest">
        {label}
      </p>
    </div>
  </div>
);

export default DesignSystem;
